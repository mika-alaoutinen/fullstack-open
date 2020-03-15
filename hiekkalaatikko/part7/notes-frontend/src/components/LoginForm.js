import React from 'react'
import loginService from "../services/loginService"
import noteService from "../services/noteService"
import { Form } from 'react-bootstrap'
import { Button } from './styles'

const LoginForm = ({
  username, setUsername, password, setPassword, setUser, setErrorMessage, setMessage }) => {

  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user)) 
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showLoginMessage()

    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => setErrorMessage(null))
    }
  }

  const showLoginMessage = () => {
    setMessage(`welcome ${username}`)
    setTimeout(() => setMessage(null), 5000)
  }

  return (
    <div>
      <h2>login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>

          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />

          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />

        <Button type="submit" primary=''>login</Button>
          {/* <Button variant="primary" type="submit">login</Button> */}
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm