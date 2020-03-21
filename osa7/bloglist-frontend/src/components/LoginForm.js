import React from 'react'
import { useDispatch } from 'react-redux'
import Notification from './Notification'
import { useField } from '../hooks/index'
import { userLogin } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  
  // Custom hooks to manage login input state:
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')
  
  const handleLogin = event => {
    event.preventDefault()
    dispatch(userLogin(username, password))
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

export default LoginForm