import React from 'react'
import PropTypes from 'prop-types'
import Notification from './Notification'
import blogService from '../services/blogService'
import loginService from '../services/loginService'
import noticeService from '../services/noticeService'

const LoginForm = ({ username, password, setUser, message, setMessage, error, setError }) => {
  
  const handleLogin = async event => {
    event.preventDefault()

    loginService.login({ username: username.value, password: password.value })
      .then(user => {
        window.localStorage.setItem('user', JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
      })
      .catch(() => noticeService.showError('wrong username or password', setMessage, setError))
  }

  return (
    <div className='loginPage'>
      <h1>log in to application</h1>
      <Notification message={message} error={error} />

      <form onSubmit={handleLogin}>
        <div>username
          <input { ...username } />
        </div>

        <div>password
          <input { ...password } />
        </div>

        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
}

export default LoginForm