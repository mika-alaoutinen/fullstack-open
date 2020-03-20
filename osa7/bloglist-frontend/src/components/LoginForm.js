import React from 'react'
import { useDispatch } from 'react-redux'
import Notification from './Notification'
import { userLogin } from '../reducers/userReducer'

const LoginForm = ({ username, password }) => {
  const dispatch = useDispatch()
  
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