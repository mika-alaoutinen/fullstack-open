import React from 'react'
import Notification from "./Notification"
import blogService from '../services/blogService'
import loginService from "../services/loginService"
import noticeService from "../services/noticeService"

const LoginForm = ({
  username, setUsername, password, setPassword, setUser,
  message, setMessage, error, setError }) => {

  const handleLogin = async event => {
    event.preventDefault()

    loginService.login({ username, password })
      .then(user => {
        window.localStorage.setItem('user', JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
      })
      .then(() => {
        setUsername('')
        setPassword('')
      })
      .catch(() => noticeService.showError('wrong username or password', setMessage, setError))
  }

  return (
    <div>
      <h1>log in to application</h1>
      <Notification message={message} error={error} />

      <form onSubmit={handleLogin}>
        <div>username
          <input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm