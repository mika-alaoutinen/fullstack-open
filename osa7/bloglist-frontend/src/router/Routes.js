import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Blog from '../components/blog/Blog'
import Blogs from '../components/blog/Blogs'
import NavigationMenu from '../components/common/NavigationMenu'
import UserPage from '../components/user/User'
import UsersPage from '../components/user/Users'

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
        <Route exact path='/blogs' component={Blogs} />
        <Route exact path='/users' component={UsersPage} />
        <Route exact path='/blogs/:id' component={Blog} />
        <Route exact path='/users/:id' component={UserPage} />
      </Switch>
    </Router>
  )
}

export default Routes