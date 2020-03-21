import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import BlogPage from '../components/pages/BlogPage'
import UsersPage from '../components/pages/UsersPage'

const Routes = () => (
  <Router>
    <div style={{ display: 'inline' }}>
      <Link style={{ paddingRight: 5 }} to='/'>home</Link>
      <Link style={{ paddingRight: 5 }} to='/blogs'>blogs</Link>
      <Link style={{ paddingRight: 5 }} to='/users'>users</Link>
    </div>

    <Switch>
      <Route exact path='/blogs' render={() =>
        <BlogPage />}
      />

      <Route exact path='/users' render={() =>
        <UsersPage />}
      />
    </Switch>
  </Router>
)

export default Routes