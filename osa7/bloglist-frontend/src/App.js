import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Login from './components/common/Login'
import Routes from './router/Routes'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import { setUser } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    checkLoggedUser()       // Check if user credentials are in local storage:
    dispatch(initBlogs())   // Retrieve all blogs from the server
    dispatch(initUsers())   // Retrieve all users from the server
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const checkLoggedUser = () => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
    }
  }

  return user === null
    ? <Login />
    : <Routes />
}

export default App