import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import BlogPage from '../components/pages/BlogPage'
import NavigationMenu from '../components/common/NavigationMenu'
import UsersPage from '../components/pages/UsersPage'

const Routes = () => {
  const navBar = {
    backgroundColor: 'lightgrey',
    padding: 10,
  }

  return (
    <Router>
      <div style={navBar}>
        <NavigationMenu />
      </div>

      <Switch>
        <Route path='/blogs' component={BlogPage} />
        <Route path='/users' component={UsersPage} />
      </Switch>
    </Router>
  )
}

export default Routes