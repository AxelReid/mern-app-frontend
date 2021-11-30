import React, { useRef, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useGlobalContext } from '../context'
import { SimpleSpin } from './customs'
import { FaSignOutAlt, IoLanguage, IoColorPalette } from 'react-icons/all'

const Nav = () => {
  const location = useLocation()
  const refHeight = useRef(null)
  const refTarget = useRef(null)
  const { setFormOpen, userState, logout, switchTheme } = useGlobalContext()
  const { pathname } = window.location
  const [loggingOut, setLogstate] = useState(false)

  const logOut = () => {
    setLogstate(true)
    setTimeout(() => {
      logout('intend')
      setLogstate(false)
    }, 1000)
  }
  const toggleHeader = () => {
    const { offsetHeight: height } = refHeight.current
    const { offsetHeight: navHeight } = refTarget.current
    refTarget.current.style.height =
      navHeight > 100 ? 100 + 'px' : height + 20 + 'px'
  }

  return (
    <Navbar ref={refTarget}>
      <div className='header-container' ref={refHeight}>
        <div className='nav-left'>
          <button
            className='bigger no-width bluedark toggle-link'
            onClick={toggleHeader}
          >
            <FaBars />
          </button>
          <nav className='menu-links'>
            <li className={pathname === '/' ? 'active' : ''}>
              <Link to='/'>home</Link>
            </li>
            <li className={pathname === '/dashboard' ? 'active' : ''}>
              <Link to='/dashboard'>dashboard</Link>
            </li>
            <li className={pathname === '/people' ? 'active' : ''}>
              <Link to='/people'>people</Link>
            </li>
            {userState.user && userState.user.role === 'ADMIN' && (
              <li className={pathname === '/admin' ? 'active' : ''}>
                <a href='/admin'>admin</a>
              </li>
            )}
          </nav>
        </div>
        <div className='logs'>
          <div className='log-cl toolkit'>
            <button
              className='bigger no-width bluedark'
              onClick={() => switchTheme()}
            >
              <IoColorPalette />
            </button>
            <button className='bigger no-width bluedark'>
              <IoLanguage />
            </button>
            {location.pathname === '/' && (
              <button
                className='bigger btn blue no-width toggle-form'
                onClick={() => setFormOpen(true)}
              >
                <FaBars />
              </button>
            )}
          </div>
          <div className='log-cl'>
            <button
              className='bluedark bigger darker'
              onClick={() => logOut()}
              disabled={loggingOut}
            >
              {loggingOut ? (
                <SimpleSpin height='20px' />
              ) : (
                <>
                  <FaSignOutAlt />
                  <span>Logout</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Navbar>
  )
}
const Navbar = styled.header`
  z-index: 10;
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.bg_light};
  box-shadow: 0 2px 7px ${({ theme }) => theme.shadow_1};
  overflow: hidden;
  transition: height 0.3s;
  .header-container {
    ${({ theme }) => theme.mixins.flexBox('flex-end', 'space-between')}
    min-height: 100px;
  }
  .nav-left {
    .toggle-link {
      display: none;
    }
    ${({ theme }) => theme.mixins.flexBox('flex-end')}
    .menu-links {
      ${({ theme }) => theme.mixins.flexBox('center')}
      margin-left: 20px;
      li {
        position: relative;
        padding: 0 20px 15px 20px;
        text-transform: capitalize;
        &.active {
          a {
            color: ${({ theme }) => theme.color_bluedark};
          }
          &:before {
            ${({ theme }) => theme.mixins.before()}
            content: "";
          }
        }
      }
    }
  }
  .logs {
    position: relative;
    padding: 10px 20px;
    gap: 10px;
    ${({ theme }) => theme.mixins.flexBox('center', 'flex-end', 'row-reverse')}
    .log-cl {
      ${({ theme }) => theme.mixins.flexBox('center', 'flex-end')}
      gap: 10px;
    }
    @media (min-width: 1050px) {
      .toggle-form {
        display: none;
      }
    }
  }
  @media (min-width: 950px) {
    height: 100px !important;
  }
  @media (max-width: 950px) {
    height: 100px;
    padding-top: 30px;
    .header-container {
      align-items: flex-start;
    }
    .nav-left {
      padding: 20px;
      .toggle-link {
        display: block;
      }
      ${({ theme }) =>
        theme.mixins.flexBox('flex-start', 'flex-start', 'column')}
      .menu-links {
        margin: 0;
        ${({ theme }) =>
          theme.mixins.flexBox('flex-start', 'flex-start', 'column')}
        li {
          padding: 15px 0 5px 0;
        }
      }
    }
    .logs {
      padding: 20px 20px 20px 0;
    }
  }
`

export default Nav
