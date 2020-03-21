import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import BlogPage from '../components/pages/BlogPage'
import NavigationMenu from '../components/common/NavigationMenu'
import UserPage from '../components/pages/UserPage'
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
        <Route exact path='/blogs' component={BlogPage} />
        <Route exact path='/users' component={UsersPage} />
        <Route exact path='/users/:id' component={UserPage} />
      </Switch>
    </Router>
  )
}

export default Routes