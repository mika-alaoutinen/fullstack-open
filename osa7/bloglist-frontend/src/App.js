import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogPage from './components/BlogPage'
import LoginForm from './components/LoginForm'
import blogService from './services/blogService'
import { initBlogs } from './reducers/blogReducer'
import { userLogin, setUser } from './reducers/userReducer'
import { useField } from './hooks/index'

const App = () => {
  const dispatch = useDispatch()

  // Check if user credentials are in local storage:
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
    }
  }, [dispatch])

  // Retrieve all blogs from the server:
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  // Custom state management hooks:
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')
  
  const user = useSelector(state => state.user)

  return (
    <div>
      {user === null
        ? <LoginForm username={username} password={password} />
        : <BlogPage username={user.username} />
      }
    </div>
  )
}

export default App