import React from 'react'
import blogService from '../services/blogService'
import loginService from "../services/loginService"

const LoginForm = ({
  username, setUsername, password, setPassword, user, setUser, setErrorMessage }) => {

  const handleLogin = async (event) => {
    event.preventDefault()

    loginService.login({ username, password })
      .then(user => {
        window.localStorage.setItem('user', JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
      })
      .catch(error => {
        setErrorMessage('wrong credentials')
        setTimeout(() => setErrorMessage(null))
      })
  }

  return (
    <div>
      <h1>log in to application</h1>

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