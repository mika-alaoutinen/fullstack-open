import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Blog from '../components/blog/Blog'
import Blogs from '../components/blog/Blogs'
import NavigationMenu from '../components/common/NavigationMenu'
import User from '../components/user/User'
import Users from '../components/user/Users'

const Routes = () => (
  <Router>
    <NavigationMenu />

    <Switch>
      <Route exact path='/blogs' component={Blogs} />
      <Route exact path='/users' component={Users} />
      <Route exact path='/blogs/:id' component={Blog} />
      <Route exact path='/users/:id' component={User} />
    </Switch>
  </Router>
)

export default Routes