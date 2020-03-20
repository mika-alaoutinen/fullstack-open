import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import BlogPage from './components/BlogPage'
import LoginForm from './components/LoginForm'
import blogService from './services/blogService'
import { initBlogs } from './reducers/blogReducer'
import { useField } from './hooks/index'

const App = () => {
  const dispatch = useDispatch()

  // Custom state management hooks:
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  // State management:
  const [user, setUser] = useState(null)

  // Check if user credentials are in local storage:
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Retrieve all blogs from the server:
  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  return (
    <div>
      {user === null
        ? <LoginForm
          username={username}
          password={password}
          setUser={setUser}
        />
        : <BlogPage username={username} />
      }
    </div>
  )
}

export default App