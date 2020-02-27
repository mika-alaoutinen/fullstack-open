import React, { useState } from 'react'
import loginService from "../services/loginService"
import noteService from "../services/noteService"

const LoginForm = ({
  username, setUsername, password, setPassword, setUser, setErrorMessage }) => {

  // State management:
  const [loginVisible, setLoginVisible] = useState(false)

  // Login form visibility:
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user)) 
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => setErrorMessage(null))
    }
  }

  return (
    <div>
      <h2>login</h2>
      
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>log in</button>
      </div>

      <div style={showWhenVisible}>
        <form onSubmit={handleLogin}>
          <div>username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div>password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <button type="submit">login</button>
        </form>

        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default LoginForm