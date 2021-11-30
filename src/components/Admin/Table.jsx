import React, { memo, useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import { FaSort } from 'react-icons/all'
import TableItem from './TableItem'
import { AnimatePresence, motion } from 'framer-motion'

const Table = memo(({ data, title, getUser_id, type }) => {
  const tbodyRef = useRef(null)
  const [selected, setSelected] = useState([])
  const [oneSelected, setOneSelected] = useState(null)

  const selectItem = useCallback(
    (e, item_id) => {
      if (!e.target.title) {
        const id_exist = selected.find((id) => id === item_id)
        if (!id_exist) {
          setSelected([...selected, item_id])
        } else {
          setSelected(selected.filter((ids) => ids !== item_id))
        }
      }
    },
    [selected]
  )

  const itemClick = useCallback(
    (e, id) => {
      if (!e.target.title) {
        if (selected.length === 0) {
          if (type === 'users') {
            getUser_id(id)
            setOneSelected(id)
          }
        } else {
          selectItem(e, id)
        }
      }
    },
    [selected]
  )

  return (
    <PostsTable className='padding'>
      <p className='hdr text secondary'>{title || 'No title'}</p>
      {data.length === 0 ? (
        <h1 className='text secondary center'>Nothing yet</h1>
      ) : (
        <>
          <AnimatePresence>
            {selected.length !== 0 && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ type: 'tween' }}
                style={{ overflow: 'hidden' }}
              >
                <div className='padding_2 item-select bg'>
                  <b className='text small'>
                    <span className='text secondary'>Selected:</span>{' '}
                    <span>{selected.length}</span>
                  </b>
                  <div className='gap'>
                    <b className='text small pointer red'>Delete selected</b>
                    <b
                      className='text small pointer'
                      onClick={() => setSelected([])}
                    >
                      Cancel
                    </b>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className='scrollable'>
            <table>
              <thead>
                <tr>
                  <th>N</th>
                  {Object.keys(data[0]).map((key, i) => {
                    if (key !== '_id') {
                      return (
                        <th key={i}>
                          <span>
                            {key}{' '}
                            {key !== 'image' && (
                              <span className='text-light hover-light'>
                                <FaSort />
                              </span>
                            )}
                          </span>
                        </th>
                      )
                    }
                  })}
                  <th>actions</th>
                </tr>
              </thead>
              <tbody ref={tbodyRef}>
                {data.map((dt, i) => (
                  <tr
                    key={dt._id}
                    onDoubleClick={(e) => selectItem(e, dt._id)}
                    onClick={(e) => itemClick(e, dt._id)}
                    id={oneSelected === dt._id ? 'context' : ''}
                    className={
                      selected.find((id) => id === dt._id) ? 'selected' : ''
                    }
                  >
                    <TableItem
                      type={type}
                      tbodyRef={tbodyRef}
                      an_item={dt}
                      i={i}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </PostsTable>
  )
})

const PostsTable = styled.section`
  position: relative;
  width: 100%;
  .scrollable {
    overflow-x: auto;
  }
  .item-select {
    ${({ theme }) => theme.mixins.flexBox('center', 'space-between')}
    div {
      ${({ theme }) => theme.mixins.flexBox()}
    }
  }
  table {
    width: 100%;
    &,
    th,
    td {
      /* position: relative; */
      border-collapse: collapse;
      text-align: left;
      button {
        border-radius: 50%;
        width: 30px;
        height: 30px;
      }
      .post-action-btns {
        gap: 15px;
        display: flex;
        align-items: center;
        height: 100%;
        button {
          overflow: hidden;
          .delete-content {
            display: none;
          }
          * {
            pointer-events: none;
          }
          &.red.active {
            * {
              pointer-events: visible;
            }
            transition: 0.1s;
            p {
              white-space: nowrap;
            }
            .delete-content {
              width: 100%;
              ${({ theme }) => theme.mixins.flexBox('center', 'space-between')}
              span {
                ${({ theme }) => theme.mixins.flexBox()}
                gap:20px;
              }
            }
            svg {
              display: none;
            }
            position: absolute;
            top: 0;
            right: 0;
            border-radius: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    th,
    td {
      padding: 5px 7px;
    }
    thead {
      th {
        padding-bottom: 15px;
        span {
          display: flex;
        }
      }
    }
    tbody {
      tr {
        position: relative;
        transition: 0.2s;
        * {
          user-select: none;
        }
        &:hover {
          transition: 0s;
          background: ${({ theme }) => theme.underline};
          cursor: pointer;
        }
        &#context {
          /* background: ${({ theme }) => theme.underline}; */
          .username {
            color: ${({ theme }) => theme.color_darker};
          }
        }
        &.selected {
          background: ${({ theme }) => theme.underline_alt};
        }
      }
      td {
        .img-circle {
          border-radius: 50%;
          width: 40px;
          height: 40px;
          background-position: center;
          background-size: cover;
          background-color: ${({ theme }) =>
            theme.bg_lighter === '#f4f4f4' ? '' : theme.bg_lighter};
          background-blend-mode: overlay;
          box-shadow: 1px 1px 3px ${({ theme }) => theme.light_shadow};
        }
      }
    }
  }
`

export default Table
