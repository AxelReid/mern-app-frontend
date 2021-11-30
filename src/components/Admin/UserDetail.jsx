import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context'
import Table from './Table'
import { FaCheck } from 'react-icons/all'
import request from '../../request'

const UserDetail = ({ user_id, getUser_id }) => {
  const { userState, userDispatch } = useGlobalContext()
  const [user_posts, setUser_Posts] = useState([])
  const [the_user, setThe_user] = useState(null)

  const findUser = useCallback(() => {
    if (userState.allUsers.length > 0) {
      setThe_user(userState.allUsers.find(({ _id }) => _id === user_id))
    }
  }, [user_id])

  const getUserPosts = useCallback(async () => {
    try {
      const user_posts = await request.get('posts/admin/user-posts/' + user_id)
      const posts = user_posts.data.posts.map(
        ({ _id, image, title, date, comments }) => ({
          _id,
          image,
          title,
          date,
          likes: Math.round(Math.random() * 100).toString(),
          comments: comments.length,
        })
      )
      setUser_Posts(posts)
    } catch (error) {
      console.log(error)
    }
  }, [user_id])

  const userRole = async () => {
    try {
      const res = await request.patch(
        `user/admin/role?userID=${user_id}&to_role=${
          the_user.role === 'ADMIN' ? 'USER' : 'ADMIN'
        }`
      )
      const { to_role, msg } = res.data
      userDispatch({
        type: 'CHANGE_USER',
        user_id,
        key: 'role',
        value: to_role,
      })
      console.log(msg)
      setThe_user((prev) => ({ ...prev, role: to_role }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user_id) {
      getUserPosts()
      findUser()
    }
  }, [user_id])

  return (
    <Details className='gap'>
      <div className='admin-header gap'>
        <div className='user-bio padding card shadow'>
          <h2>{the_user ? the_user.username : '---'}</h2>
          <p className='text secondary'>{the_user ? the_user.email : '---'}</p>
        </div>
        <div className='user-bio padding card shadow'>
          <h2>Since</h2>
          <p className='text secondary'>
            {the_user ? new Date(the_user.date).toLocaleString() : '---'}
          </p>
        </div>
        <div className='user-bio padding card shadow'>
          <h2>{user_posts ? user_posts.length : '---'}</h2>
          <p className='text secondary'>posts</p>
        </div>
      </div>
      <div className='admin-header gap'>
        <div className='card shadow user-info padding'>
          <p className='hdr text secondary'>User personal Info</p>

          <div className='change-user-info gap'>
            <div className='user-info-set gap'>
              <div className='avatar'></div>
              <div className='inputs gap'>
                <input
                  defaultValue={the_user && the_user.username}
                  type='text'
                  className='shadow'
                  placeholder='username'
                />
                <input
                  defaultValue={the_user && the_user.email}
                  type='email'
                  className='shadow'
                  placeholder='email'
                />
                <input type='text' className='shadow' placeholder='password' />
              </div>
            </div>
            <button className='btn blue bigger'>
              Edit {the_user && the_user.username + '`s'} info
            </button>
          </div>
        </div>
        <div className='card shadow user-info padding'>
          <p className='hdr text secondary'>User privilages</p>
          <div className='role-wrapper'>
            <div className='role_display gap'>
              <h3>{the_user ? the_user.username + ' :' : '---'}</h3>
              <h3 className='btnish bigger not-allowed bg green_light text white'>
                {the_user ? (
                  <>
                    <FaCheck /> {the_user.role}
                  </>
                ) : (
                  '---'
                )}
              </h3>
            </div>
            <p className='text small hdr secondary'>
              By default, everyone is a <b className='text secondary'>USER</b>.
              You as an <b className='text secondary'>ADMIN</b> can promote them
              to the ADMIN from the USER role or wise-reverse. <br />
              <br />
              <b className='text secondary'>NOTE: </b> An admin will have full
              access and action to this project.
            </p>
            <button
              onClick={() => userRole()}
              className={`btn ${
                the_user
                  ? the_user.role === 'ADMIN'
                    ? 'bluedark darker bigger'
                    : 'red bigger'
                  : 'bluedark darker bigger'
              }`}
            >
              {the_user
                ? the_user.role === 'ADMIN'
                  ? 'Roll back to USER'
                  : 'Promote to ADMIN'
                : '---'}
            </button>
          </div>
        </div>
      </div>
      <div className='card shadow user-details'>
        <Table
          type='posts'
          data={user_posts}
          title={the_user && the_user.username + '`s posts'}
          getUser_id={getUser_id}
        />
      </div>
    </Details>
  )
}

const Details = styled.section`
  position: relative;
  flex: 1 1 auto;
  ${({ theme }) => theme.mixins.flexBox('flex-start', 'flex-start', 'column')}
  .user-details {
    width: 100%;
  }
  .admin-header {
    width: 100%;
    ${({ theme }) => theme.mixins.flexBox('stretch', 'flex-start')}
    .user-bio {
      flex: 0 1 35%;
    }

    .user-info {
      position: relative;
      &:nth-child(1) {
        flex: 0 1 60%;
      }
      &:nth-child(2) {
        flex: 0 1 40%;
        ${({ theme }) => theme.mixins.flexBox('intial', 'initial', 'column')}
        .role-wrapper {
          flex: 1 1 auto;
          ${({ theme }) =>
            theme.mixins.flexBox('initial', 'space-between  ', 'column')}
        }
        .role_display {
          ${({ theme }) => theme.mixins.flexBox('center', 'space-between')}
          margin-bottom: 20px;
          .green_light {
            flex: 0 0 60%;
          }
        }
      }

      .change-user-info {
        position: relative;
        .user-info-set {
          ${({ theme }) => theme.mixins.flexBox('flex-start', 'flex-start')}
        }
        ${({ theme }) =>
          theme.mixins.flexBox('stretch', 'flex-start', 'column')}
        .avatar {
          width: 160px;
          height: 160px;
          background: ${({ theme }) => theme.underline};
          border-radius: 4px;
        }
        .inputs {
          position: relative;
          flex: 1 1 auto;
          ${({ theme }) =>
            theme.mixins.flexBox('flex-start', 'flex-start', 'column')}
          input {
            width: 100%;
            padding: 10px;
            border-radius: 4px;
            background: none;
            border: 2px solid ${({ theme }) => theme.underline};
          }
        }
      }
    }
  }
  @media (max-width: 1000px) {
    .admin-header:nth-child(2) {
      flex-direction: column;
    }
  }
`
export default UserDetail
