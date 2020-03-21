import React from 'react'
import { useSelector } from 'react-redux'
import Routes from '../../router/Routes'

const NavigationMenu = () => {

  // Navigation menu styling:
  const navBar = {
    backgroundColor: 'lightgrey',
    padding: 5,
  }

  const logout = () => () => {
    window.localStorage.clear()
    window.location.reload()
  }
  
  const user = useSelector(state => state.user)

  const renderNavigationMenu = () =>
    <div style={navBar} className='navigationMenu'>
      <Routes />
      {user.username} logged in

      <button onClick={logout()} style={{ marginLeft: 10 }}>
        logout
      </button>
    </div>

  return user ? renderNavigationMenu() : null
}

export default NavigationMenu