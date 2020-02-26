import React, { useEffect, useState } from 'react'
import BlogPage from "./components/BlogPage";
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogService"

const App = () => {
  // State management:
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
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
            user={user} setUser={setUser}
            setErrorMessage={setErrorMessage}
          />
        : <BlogPage
            userName={user.name}
            blogs={blogs}
            setBlogs={setBlogs}
          />
      }
    </div>
  )
}

export default App