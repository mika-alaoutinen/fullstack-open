import React from 'react'
import loginService from "../services/loginService"
import Toggleable from "./Toggleable";
import noteService from "../services/noteService"

const LoginForm = ({
  username, setUsername, password, setPassword, setUser, setErrorMessage }) => {

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
      
      <Toggleable buttonLabel='open login'>
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
      </Toggleable>
    </div>
  )
}

export default LoginForm