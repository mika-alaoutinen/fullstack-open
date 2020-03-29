import React from 'react'
import { useApolloClient } from '@apollo/client'

const LogoutButton = ({ show, setToken, setPage }) => {
  const client = useApolloClient()

  const logout = () => () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return show
    ? <button onClick={logout()}>logout</button>
    : null
}

export default LogoutButton