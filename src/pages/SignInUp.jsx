import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import {
  BiUser,
  BiLock,
  MdEmail,
  FaArrowLeft,
  IoColorPalette,
  IoLanguage,
} from 'react-icons/all'
import request from '../request'
import { useGlobalContext } from '../context'
import { SimpleSpin, Alert } from '../components/customs'
import { AnimatePresence } from 'framer-motion'

const SignInUp = ({ route }) => {
  const history = useHistory()
  const { alert, setAlert, userDispatch, switchTheme } = useGlobalContext()
  let page_title =
    (route === 'sign-up' && 'Sign up') || (route === 'sign-in' && 'Login')
  const [info, setInfo] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const clearInfo = () =>
    setInfo({ username: '', email: '', password: '', date: new Date() })
  const handleHandle = (e) => {
    const { name, value } = e.target
    setInfo({ ...info, [name]: value })
  }
  const submit = (e) => {
    e.preventDefault()
    if (
      !info.username ||
      !info.password ||
      (route === 'sign-up' && !info.email)
    ) {
      console.log('please don`t leave any credetial empty!')
      setAlert({
        msg: 'please don`t leave any credetial empty!',
        status: 'fail_light',
      })
      return
    }
    setLoading(true)
    signupin('/user/' + route, info)
  }
  const signupin = async (api, data) => {
    try {
      const user = await request.post(api, data)
      setAlert({ msg: user.data.msg, status: 'success_light' })
      if (route === 'sign-in') {
        localStorage.setItem('auth_token', user.headers.auth_token)
        const { user: USER, posts: POSTS } = user.data
        userDispatch({ type: 'GET_USER', payload: { user: USER } })
        userDispatch({ type: 'GET_POSTS', payload: { posts: POSTS } })
      }
      setTimeout(() => {
        setLoading(false)
        if (route === 'sign-in') {
          window.location.replace('/')
        }
        if (route === 'sign-up') {
          history.push('/sign-in')
        }
        setAlert(
          route === 'sign-up'
            ? { msg: 'Sing in to the acccount', status: 'success' }
            : { msg: '', status: '' }
        )
      }, 1500)
    } catch (error) {
      const { data, statusText, status } = error.response
      setAlert({
        msg: status === 500 ? statusText : data,
        status: 'fail_light',
      })
      setLoading(false)
    }
  }

  return (
    <Log>
      <header className='login-page-header'>
        <div className='btn-tools'>
          <i className='icon-circle' onClick={() => history.push('/')}>
            <FaArrowLeft />
          </i>
          <i className='icon-circle' onClick={() => switchTheme()}>
            <IoColorPalette />
          </i>
          <i className='icon-circle'>
            <IoLanguage />
          </i>
        </div>
      </header>
      <form onSubmit={submit} autoComplete='off'>
        <h1>{page_title}</h1>
        <AnimatePresence>
          {alert.msg && <Alert top='100px' type='text' />}
        </AnimatePresence>
        <div className='div form-style'>
          <i>
            <BiUser />
          </i>
          <input
            type='text'
            name='username'
            value={info.username}
            onChange={handleHandle}
            className='clear'
            placeholder='Username'
          />
        </div>
        {route === 'sign-up' && (
          <div className='div form-style'>
            <i>
              <MdEmail />
            </i>
            <input
              type='email'
              name='email'
              value={info.email}
              onChange={handleHandle}
              className='clear'
              placeholder='Email'
            />
          </div>
        )}
        <div className='div form-style'>
          <i>
            <BiLock />
          </i>
          <input
            type='password'
            name='password'
            value={info.password}
            onChange={handleHandle}
            className='clear'
            placeholder='Password'
          />
        </div>

        <button
          className='bigger special'
          disabled={loading || alert.msg ? true : false}
        >
          {loading ? (
            <SimpleSpin height='25px' />
          ) : (
            (route === 'sign-up' && 'Create an account') ||
            (route === 'sign-in' && 'Logn in')
          )}
        </button>
        <Link
          onClick={() => clearInfo()}
          to={
            (route === 'sign-up' && '/sign-in') ||
            (route === 'sign-in' && 'sign-up')
          }
        >
          {(route === 'sign-up' && (
            <>
              Have an account? <b>Login!</b>
            </>
          )) ||
            (route === 'sign-in' && (
              <>
                First time here? <b>Sign up!</b>
              </>
            ))}
        </Link>
      </form>
    </Log>
  )
}
const Log = styled.div`
  position: relative;
  ${({ theme }) => theme.mixins.flexBox('center', 'flex-start', 'column')}
  .login-page-header {
    ${({ theme }) => theme.mixins.flexBox('center', 'space-between')}
    ${({ theme }) => theme.mixins.fluid('1000px')};
    padding: 3% 0;
    margin-bottom: 40px;
    .btn-tools {
      ${({ theme }) => theme.mixins.flexBox()}
      gap: 10px;
    }
  }
  form {
    position: relative;
    ${({ theme }) => theme.mixins.fluid()};
    ${({ theme }) => theme.mixins.flexBox('', '', 'column')}
    gap:30px;
    padding-bottom: 2%;
    h1 {
      margin-bottom: 70px;
      font-size: 2.5rem;
      color: ${({ theme }) => theme.color_light};
    }
    div.div {
      ${({ theme }) => theme.mixins.flexBox('stretch')}
      padding: 0;
      input {
        flex: 1 1 auto;
        outline: none;
      }
      i {
        flex: 0 1 auto;
        width: 45px;
        display: grid;
        place-items: center;
        font-size: 1.3rem;
      }
    }
    button {
      margin-top: 40px;
    }
    a {
      color: ${({ theme }) => theme.color_darker};
      text-align: center;
    }
  }
`
export default SignInUp
