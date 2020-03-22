import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Nav, StyledLink } from '../styles/styles'

const NavigationMenu = () => {
  const user = useSelector(state => state.user)

  const logout = () => () => {
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <Nav>
      <StyledLink to='/'>home</StyledLink>
      <StyledLink to='/blogs'>blogs</StyledLink>
      <StyledLink to='/users'>users</StyledLink>

      {user && <>{user.username} logged in</>}

      <Button onClick={logout()} style={{ marginLeft: 10 }}>
        logout
      </Button>
    </Nav>
  )
}

export default NavigationMenu