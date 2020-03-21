import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NavigationMenu = () => {
  const user = useSelector(state => state.user)
  
  const logout = () => () => {
    window.localStorage.clear()
    window.location.reload()
  }
  
  return (
    <nav>
      <Link style={{ paddingRight: 5 }} to='/'>home</Link>
      <Link style={{ paddingRight: 5 }} to='/blogs'>blogs</Link>
      <Link style={{ paddingRight: 5 }} to='/users'>users</Link>

      {user && <>{user.username} logged in</>}

      <button onClick={logout()} style={{ marginLeft: 10 }}>
        logout
      </button>
    </nav>
  )
}

export default NavigationMenu