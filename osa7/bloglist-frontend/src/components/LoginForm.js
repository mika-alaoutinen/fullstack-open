import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import Notification from './Notification'
import blogService from '../services/blogService'
import loginService from '../services/loginService'
import { setError } from '../reducers/notificationReducer'

const LoginForm = ({ username, password, setUser }) => {
  const dispatch = useDispatch()
  
  const handleLogin = async event => {
    event.preventDefault()

    loginService.login({ username: username.value, password: password.value })
      .then(user => {
        window.localStorage.setItem('user', JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
      })
      .catch(() => dispatch(setError('wrong username or password')))
  }

  return (
    <div className='loginPage'>
      <h1>log in to application</h1>
      <Notification />

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
}

export default LoginForm