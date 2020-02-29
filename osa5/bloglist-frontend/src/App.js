import React, { useEffect, useState } from 'react'
import BlogPage from './components/BlogPage'
import LoginForm from './components/LoginForm'
import blogService from './services/blogService'
import { useField } from './hooks/index'

const App = () => {
  // Custom state management hooks:
  const username = useField('text')
  const password = useField('password')

  // State management:
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  // Check if user credentials are in local storage:
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {user === null
        ? <LoginForm
          username={username}
          password={password}
          setUser={setUser}
          message={message} setMessage={setMessage}
          error={error} setError={setError}
        />
        : <BlogPage
          username={username}
          blogs={blogs} setBlogs={setBlogs}
          message={message} setMessage={setMessage}
          error={error} setError={setError}
        />
      }
    </div>
  )
}

export default App