import React from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/queries'
import { useField } from '../hooks/hooks'

const LoginForm = ({ show, setToken, setMessage }) => {
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => setMessage(error.graphQLErrors[0].message)
  })

  if (!show) {
    return null
  }

  const handleLogin = event => {
    event.preventDefault()
    console.log('login')
    setMessage('testi')
    // send login info
  }

  return (
    <div className='loginPage'>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>username
        <input {...username} />
        </div>

        <div>password
        <input {...password} />
        </div>

        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm