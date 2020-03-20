import React from 'react'
import PropTypes from 'prop-types'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Notification from './Notification'
import Toggleable from './Toggleable'

const BlogPage = ({ username }) => {

  const logout = () => () => {
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div className='blogPage'>
      <h2>blogs</h2>
      <Notification />

      <p>{username} logged in</p>
      <p>
        <button onClick={logout()}>logout</button>
      </p>

      <Toggleable buttonLabel='create new' >
        <BlogForm />
      </Toggleable>

      <BlogList />
    </div>
  )
}

BlogPage.propTypes = {
  username: PropTypes.string.isRequired,
}

export default BlogPage