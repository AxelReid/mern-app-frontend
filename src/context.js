import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from 'react'
import request from './request'
import { userReducer } from './components/userControl'

const AppContext = createContext()
const userDefaults = { user: null, userPosts: [], allUsers: [] }

export const AppProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, userDefaults)

  const [formOpen, setFormOpen] = useState(false)

  const [alert, setAlert] = useState({ msg: '', status: '' })
  const [currentTheme, setTheme] = useState(
    Number(localStorage.getItem('current_theme') || 0)
  )
  const logout = (intend) => {
    localStorage.removeItem('auth_token')
    intend && setAlert({ msg: 'You logged out!', status: 'fail' })
    userDispatch({ type: 'CLEAN' })
  }

  const switchTheme = () => {
    const num = currentTheme >= 2 ? 0 : currentTheme + 1
    setTheme(num)
    localStorage.setItem('current_theme', num)
    setAlert({ msg: 'Changed to theme ' + num, status: 'success' })
  }

  useCallback(() => {
    document.body.style.overflowY = formOpen ? 'hidden' : 'auto'
  }, [formOpen])

  const fetchUserPosts = useCallback(async () => {
    try {
      const posts = await request.get('/posts/get/')
      userDispatch({
        type: 'GET_POSTS',
        payload: {
          posts: posts.data,
        },
      })
    } catch (error) {
      console.log(`couldn't fetch posts`)
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        userState,
        userDispatch,

        formOpen,
        alert,

        setAlert,
        setFormOpen,
        logout,
        fetchUserPosts,
        switchTheme,
        currentTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
