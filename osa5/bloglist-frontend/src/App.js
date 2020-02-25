import React, { useState } from 'react'
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";

const App = () => {
  // State management:
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  return (
    <div>
      {user === null
        ? <LoginForm
            username={username} setUsername={setUsername}
            password={password} setPassword={setPassword}
            user={user} setUser={setUser}
            setErrorMessage={setErrorMessage}
          />
        : <BlogList blogs={blogs} setBlogs={setBlogs} />
      }
    </div>
  )
}

export default App