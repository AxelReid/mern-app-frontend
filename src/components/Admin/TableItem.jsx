import React, { memo, useCallback } from 'react'
import { FaTrash, FaPen } from 'react-icons/all'
import Avatar from '../../assets/avatar.jpeg'
import { useGlobalContext } from '../../context'
import request from '../../request'

const TableItem = memo(({ type, tbodyRef, an_item, i }) => {
  const { userDispatch } = useGlobalContext()

  const removeClassNames = () => {
    const { childNodes } = tbodyRef.current
    for (let child of childNodes) {
      const target =
        child.childNodes[child.childNodes.length - 1].childNodes[0]
          .childNodes[1]
      target.classList.remove('active')
    }
  }

  const amdinRequests = async (url) => {
    try {
      const res = await request.delete(url)
      console.log(res)
      removeClassNames()
      const dID = url.split('a-user/')[1]
      userDispatch({ type: 'DROP_USER', ID: dID })
    } catch (error) {
      console.log(error)
    }
  }

  const handleAsk = useCallback((e) => {
    switch (e.target.title) {
      case 'Edit':
        console.log('let`s edit')
        break
      case 'Delete':
        removeClassNames()

        e.target.classList.add('active')
        break
      case 'Cancel':
        removeClassNames()
        break
      case 'Confirm':
        if (type === 'users') {
          amdinRequests('user/admin/delete/a-user/' + an_item._id)
        }
        if (type === 'posts') {
          // console.log('/admin/delete/a-post/' + an_item._id)
        }
        break
    }
  }, [])

  return (
    <>
      <td>{i + 1}</td>
      {Object.entries(an_item).map((ob) => {
        if (ob[0] !== '_id') {
          if (ob[0] === 'image') {
            return (
              <td key='image'>
                <div
                  style={{ backgroundImage: `url(${Avatar})` }}
                  className='img-circle'
                ></div>
              </td>
            )
          }
          return (
            <td className='username' key={ob[0]}>
              {ob[1]}
            </td>
          )
        }
      })}
      <td key='actions' data-title='actions' onClick={handleAsk}>
        <div className='post-action-btns'>
          <button className='btn blue' title='Edit'>
            <FaPen />
          </button>
          <button className='btn red' title='Delete'>
            <FaTrash />
            <div className='delete-content padding'>
              <p>Are you sure?</p>
              <span>
                <b title='Confirm'>Yes</b>
                <b title='Cancel'>No</b>
              </span>
            </div>
          </button>
        </div>
      </td>
    </>
  )
})

export default TableItem
