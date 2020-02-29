import React, { useEffect, useState } from 'react'
import BlogPage from './components/BlogPage'
import LoginForm from './components/LoginForm'
import blogService from './services/blogService'

const App = () => {
  // State management:
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          setUser={setUser}
          message={message} setMessage={setMessage}
          error={error} setError={setError}
        />
        : <BlogPage
          userName={user.name}
          blogs={blogs} setBlogs={setBlogs}
          message={message} setMessage={setMessage}
          error={error} setError={setError}
        />
      }
    </div>
  )
}

export default App