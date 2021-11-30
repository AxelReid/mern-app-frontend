import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { FaTimes, BiUpload, BiTrash, FaCheck } from 'react-icons/all'
import { useGlobalContext } from '../context'
import { SimpleSpin } from './customs'
import request from '../request'

const Form = () => {
  const fileRef = useRef(null)
  const { formOpen, setFormOpen, userState, fetchUserPosts, setAlert } =
    useGlobalContext()
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState({ title: '', text: '', image: '' })
  const [selectValue, setSelectValue] = useState('')
  const [img_preview, setImage_preview] = useState(null)
  const [loading, setLoading] = useState(false)

  const animation = {
    output: {
      hidden: {
        opacity: 0,
        scaleY: 0.5,
        transition: { type: 'tween', delay: 0.2 },
      },
      visible: {
        opacity: 1,
        scaleY: 1,
      },
      transition: { duration: 0.1 },
    },
    select: {
      hidden: { width: 0 },
      visible: {
        width: 'auto',
      },
    },
  }
  const clearForm = () => {
    setSelected({ title: '', text: '', image: '' })
    setSelectValue('')
    setAlert({ msg: '', status: '' })
    formOpen && setFormOpen(false)
  }
  const selectChoose = (item_id) => {
    const item = userState.userPosts.find((post) => post._id === item_id)
    setSelected(item)
    setSelectValue(item.title)
    fileRef.current.value = ''
    setImage_preview(null)
  }
  const selectBtns = (e, type) => {
    e.preventDefault()
    fileRef.current.value = ''
    setImage_preview(null)
    if (type === 'close') {
      setSelected({ title: '', text: '', image: '' })
      setSelectValue('')
    }
    if (type === 'delete') {
      addPost(false, null, true, selected)
    }
  }
  const focusHandle = (action) => {
    if (action === 'focus-in') {
      setShow(true)
    }
    if (action === 'focus-out') {
      setShow(false)
      setSelectValue('')
      if (selected._id) {
        selectValue !== selected.title && setSelected({ ...selected })
      }
    }
  }

  const selectHandle = (e) => {
    setSelectValue(e.target.value)
  }

  const imgHandle = (e) => {
    const file = e.target.files[0]
    const img_url = URL.createObjectURL(file)
    setImage_preview(img_url)
  }

  const addPost = async (toEdit, data, drop, get_selected) => {
    setLoading(true)
    try {
      const post = drop
        ? await request.delete(
            '/posts/delete/' + get_selected.image + '-&-' + get_selected._id
          )
        : toEdit
        ? await request.patch('/posts/edit/' + selected._id, data)
        : await request.post('/posts/add/', data)
      setTimeout(() => {
        setAlert({
          msg: post.data.msg,
          status: 'success',
        })
        setSelected({ title: '', text: '', image: '' })
        setSelectValue('')
        setImage_preview(null)
        fetchUserPosts()
        setLoading(false)
      }, 1000)
    } catch (error) {
      setLoading(false)
      setAlert({ msg: 'Something went wrong, try again!', status: 'fail' })
    }
  }

  const submit = (e) => {
    e.preventDefault()

    const file =
      fileRef.current.files.length === 0
        ? selected._id
          ? 'no-change'
          : null
        : fileRef.current.files[0]

    if (!selected.title || !selected.text || !file) {
      console.log('Please, fill empty inputs')
      setAlert({ msg: 'Please, fill empty inputs', status: 'fail' })
      return
    }
    if (file !== 'no-change') {
      if (file.size > 1024 * 1024) {
        console.log('This image is too big')
        setAlert({ msg: 'This image is too big', status: 'fail' })
        return
      }
    }

    const formData = new FormData()
    formData.append('image', file)
    formData.append('title', selected.title)
    formData.append('text', selected.text)
    selected._id && formData.append('_id', selected._id)

    addPost(selectValue ? true : false, formData)
  }

  useEffect(() => {
    document.body.style.overflow = formOpen ? 'hidden' : 'auto'
  }, [formOpen])

  return (
    <>
      <Addpost formOpen={formOpen}>
        <form onSubmit={submit} className='gap' encType='multipart/form-data'>
          {/* <label htmlFor='input_search'>Select Item</label> */}
          <div className='search-select'>
            <div className='select-item form-style'>
              <AnimatePresence>
                {selected._id && (
                  <motion.div
                    variants={animation.select}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    className='select-actions'
                  >
                    <button
                      className='btn blue'
                      onClick={(e) => selectBtns(e, 'close')}
                    >
                      <FaTimes />
                    </button>
                    <button
                      className='btn blue'
                      onClick={(e) => selectBtns(e, 'delete')}
                    >
                      <BiTrash />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              <input
                id='input_search'
                type='search'
                className='form-style'
                onFocus={() => focusHandle('focus-in')}
                onBlur={() => focusHandle('focus-out')}
                onChange={(e) => selectHandle(e)}
                placeholder='Select an item...'
                value={selectValue}
                autoComplete='off'
              />
            </div>
            <AnimatePresence>
              {show && (
                <motion.div
                  variants={animation.output}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  className='search-results'
                >
                  {userState.userPosts &&
                    userState.userPosts.map(({ title, _id }) => (
                      <li key={_id} onClick={() => selectChoose(_id)}>
                        {title}
                      </li>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* <label htmlFor='input_title'>title</label> */}
          <input
            id='input_title'
            className='form-style'
            type='text'
            value={selected.title}
            placeholder='Post title...'
            onChange={(e) =>
              setSelected({ ...selected, title: e.target.value })
            }
          />
          {/* <label htmlFor='textarea_text'>text</label> */}
          <textarea
            placeholder='Post description...'
            id='textarea_text'
            className='form-style'
            value={selected.text}
            onChange={(e) => setSelected({ ...selected, text: e.target.value })}
          ></textarea>
          {/* <label>image</label> */}
          <div className='form-rows gap'>
            <div
              className='form-style post-img'
              style={{
                backgroundImage: `url(${
                  img_preview || `images/${selected.image}`
                })`,
              }}
            >
              <label htmlFor='upload-img'>
                <BiUpload />
              </label>
              <p className='text secondary'>Image</p>
              <input
                hidden
                id='upload-img'
                type='file'
                accept='image/*'
                name='image'
                onChange={imgHandle}
                ref={fileRef}
              />
            </div>
            <div className='form-btns'>
              <button
                type='reset'
                onClick={() => clearForm()}
                className='bluedark bigger'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={loading}
                className='btn blue bigger'
              >
                {loading ? (
                  <SimpleSpin height='25px' />
                ) : (
                  <>
                    <FaCheck />
                    <span>{selected._id ? 'Update' : 'Add New'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </Addpost>
    </>
  )
}

export const Addpost = styled.aside`
  position: relative;
  min-width: 320px;
  max-width: 320px;
  form {
    position: relative;
    ${({ theme }) => theme.mixins.flexBox('flex-start', '', 'column')}
    label {
      margin-top: 10px;
    }
    textarea {
      padding: 15px;
      height: 168px;
    }
    .search-select {
      position: relative;
      width: 100%;
      .search-results {
        position: absolute;
        top: 100%;
        width: 100%;
        min-height: 30px;
        left: 0;
        z-index: 10;
        background: ${({ theme }) => theme.color_darker};
        border-radius: 4px;
        overflow: hidden;
        transform-origin: top;
        ${({ theme }) =>
          theme.mixins.flexBox('stretch', 'flex-start', 'column')}
        li {
          padding: 3px 10px;
          cursor: pointer;
          transition: background 0.4s;
          &:hover {
            background: rgba(0, 0, 0, 0.15);
          }
        }
      }
      .select-item {
        padding: 0;
        overflow: hidden;
        ${({ theme }) => theme.mixins.flexBox('stretch', 'space-between')}
        .select-actions {
          position: relative;
          overflow: hidden;
          ${({ theme }) => theme.mixins.flexBox('stretch', 'flex-start')}
          button {
            border-radius: 0;
            &:last-child {
              border-left: 1px solid rgba(255, 255, 255, 0.15);
            }
          }
        }
        input {
          width: auto;
          border-radius: 0;
          flex: 1 1 auto;
        }
      }
    }
    .post-img {
      width: 100px;
      height: 100px;
      ${({ theme }) => theme.mixins.flexBox('center', 'center', 'column')}
      background-position: center;
      background-size: cover;
      padding: 0;
      label {
        display: grid;
        place-items: center;
        width: 40px;
        height: 40px;
        margin: 0;
        cursor: pointer;
        border-radius: 2px;
        border: 1px dashed ${({ theme }) => theme.color_bluedark};
      }
      p {
        margin-top: 5px;
        text-align: center;
      }
    }
    .form-rows {
      position: relative;
      width: 100%;
      ${({ theme }) => theme.mixins.flexBox('flex-start', 'space-between')}
    }
    .form-btns {
      flex: 1 1 auto;
      max-width: 250px;
      gap: 20px;
      ${({ theme }) => theme.mixins.flexBox('', '', 'column')}
      button[type='submit'] {
        ${({ theme }) => theme.mixins.flexBox()}
        gap:5px;
      }
    }
  }
  @media (max-width: 1050px) {
    position: fixed;
    min-width: 100%;
    max-width: 100%;
    height: 100vh;
    padding: 80px 20px 20px 20px;
    top: 0;
    transition: 0.3s;
    right: ${({ formOpen }) => (formOpen ? '0' : '-100%')};
    z-index: 99999999;
    overflow-y: auto;
    background: ${({ theme }) => theme.bg};
    form {
      max-width: 700px;
      margin: 0 0 0 auto;
    }
  }
`
export default Form
