import React from 'react'
import PropTypes from 'prop-types'
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

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
}

export default LoginForm