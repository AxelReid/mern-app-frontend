import React from 'react'
import styled from 'styled-components'
import {
  FaInstagram,
  FaGithub,
  FaStackOverflow,
  IoEarth,
  BiEdit,
} from 'react-icons/all'
import Avatar from '../assets/avatar.jpeg'
import { useGlobalContext } from '../context'

const Profile = () => {
  const { userState } = useGlobalContext()

  return (
    <User className='card shadow'>
      <div className='block'>
        <div
          className='avatar'
          style={{ backgroundImage: `url(${Avatar})` }}
        ></div>
        <h1 className='bold'>{userState.user && userState.user.username}</h1>
        <p className='text secondary'>
          {userState.user && userState.user.email}
        </p>
      </div>
      <div className='block-2'>
        <li>
          <FaGithub />
          link text
        </li>
        <li>
          <FaStackOverflow />
          link text
        </li>
      </div>
      <div className='block-3'>
        <li>
          <IoEarth />
          link text
        </li>
        <li>
          <FaInstagram />
          link text
        </li>
      </div>
    </User>
  )
}
export const User = styled.aside`
  min-height: 418px;
  flex: 0 0 250px;
  @media (max-width: 620px) {
    flex: 1 0 100%;
  }
  .block {
    margin: 30px 0;
    ${({ theme }) => theme.mixins.flexBox('center', 'center', 'column')}
    .avatar {
      border-radius: 50%;
      width: 100px;
      height: 100px;
      margin: 0 0 15px 0;
      background-color: ${({ theme }) =>
        theme.bg_lighter === '#f4f4f4' ? '' : theme.bg_lighter};
      background-blend-mode: overlay;
      background-position: center;
      background-size: cover;
    }
    h1 {
      margin: 7px 0;
    }
    p.label {
      padding: 3px 0 0 0;
    }
  }
  .block-2,
  .block-3 {
    width: 100%;
    padding: 10px 0;
    border-top: 1px solid ${({ theme }) => theme.underline};
    ${({ theme }) => theme.mixins.flexBox('flex-start', 'center', 'column')}
    li {
      ${({ theme }) => theme.mixins.flexBox('flex-start', 'center')}
      gap: 10px;
      padding: 7px 20px;
      color: #0099ff;
      text-decoration: underline;
      font-size: 14px;
      svg {
        color: #ddd;
        font-size: 16px;
      }
    }
  }
`
export default Profile
