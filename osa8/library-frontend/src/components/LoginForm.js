import React, { useEffect } from 'react'
import { useMutation  } from '@apollo/client'
import { LOGIN } from '../graphql/queries'
import { useField } from '../hooks/hooks'

const LoginForm = ({ show, setToken, setMessage }) => {
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const [ login, result ] = useMutation(LOGIN, {
    onError: error => setMessage(error.graphQLErrors[0].message)
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data]) // eslint-disable-line
  
  const handleLogin = event => {
    event.preventDefault()
    login({ variables: { username: username.value, password: password.value } })
  }

  return show
    ? <div className='loginPage'>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>username
          <input {...username} />
        </div>

        <div>password
          <input {...password} />
        </div>

        <button type='submit'>authenticate</button>
      </form>
    </div>

    : null
}

export default LoginForm