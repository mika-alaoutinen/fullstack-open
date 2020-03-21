import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginPage from './components/pages/LoginPage'
import Routes from './router/Routes'
import { initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    checkLoggedUser()       // Check if user credentials are in local storage:
    dispatch(initBlogs())   // Retrieve all blogs from the server
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const checkLoggedUser = () => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
    }
  }

  return user === null
    ? <LoginPage />
    : <Routes />
}

export default App