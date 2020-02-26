import React, { useEffect, useState } from 'react'
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogService";

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
  
  const logout = () => () => {
    window.localStorage.clear()
    window.location.reload()
  }
  
  return (
    <div>
      {user === null
        ? <LoginForm
            username={username} setUsername={setUsername}
            password={password} setPassword={setPassword}
            user={user} setUser={setUser}
            setErrorMessage={setErrorMessage}
          />
        : <div>
            <h2>blogs</h2>
            <p>
              {user.name} logged in
              <button onClick={logout()}>logout</button>
            </p>
            <BlogList blogs={blogs} setBlogs={setBlogs} />
          </div>
      }
    </div>
  )
}

export default App