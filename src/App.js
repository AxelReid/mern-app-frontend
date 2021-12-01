import { useEffect, useState, memo } from 'react'
import request from './request'
import { useGlobalContext } from './context'
import { ThemeProvider } from 'styled-components'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'

import { GlobalStyle, all_theme } from './styles/global'
import SignInUp from './pages/SignInUp'
import PageLoading from './components/PageLoading'
import Nav from './components/Nav'
import Home from './pages/Home'
import { Alert } from './components/customs'
import Dashboard from './pages/Dashboard'
import People from './pages/People'
import Admin from './pages/Admin'

// just a comment
// just a comment
// just a comment
// just a comment
const App = memo(() => {
  const history = useHistory()
  const { logout, userState, userDispatch, formOpen, currentTheme, alert } =
    useGlobalContext()

  const [fetching, setFetching] = useState(true)
  const location = useLocation()
  const route = location.pathname.split('/')[1]
  const expections = ['sign-up', 'sign-in']
  const expectError = [400, 401, 403]

  const fetchUser = async () => {
    try {
      const user = await request.get('user/get-user')
      userDispatch({ type: 'GET_USER', payload: { user: user.data } })
      const posts = await request.get('/posts/get/')
      userDispatch({ type: 'GET_POSTS', payload: { posts: posts.data } })
      setFetching(false)
    } catch (error) {
      setFetching(false)
      console.log('no login')
      const { status } = error.response
      const meetExpection = expectError.find((code) => code === status)
      if (meetExpection) {
        logout()
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      setFetching(true)
      fetchUser()
    } else {
      setFetching(false)
    }
  }, [])

  return (
    <ThemeProvider theme={all_theme[currentTheme]}>
      <GlobalStyle
        formOpen={formOpen}
        userInfo={userState.user ? true : false}
      />
      {!expections.find((exp) => exp === route) && alert.msg && (
        <Alert key='alert' top='40px' type='box' />
      )}
      {expections.find((expect) => expect === route) ? (
        <SignInUp route={route} />
      ) : (
        <>
          <Nav />

          {fetching ? (
            <PageLoading page={route} />
          ) : userState.user ? (
            <Switch location={location} key={location.pathname}>
              <Route exact path='/' component={Home} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/people' component={People} />
              {userState.user.role === 'ADMIN' && (
                <Route exact path='/admin' component={Admin} />
              )}
            </Switch>
          ) : (
            history.push('/sign-in')
          )}
        </>
      )}
    </ThemeProvider>
  )
})

export default App
