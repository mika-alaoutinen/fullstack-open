import React from 'react'
import PropTypes from 'prop-types'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Notification from './Notification'
import Toggleable from './Toggleable'

const BlogPage = ({ username, blogs, setBlogs }) => {

  const logout = () => () => {
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div className='blogPage'>
      <h2>blogs</h2>
      <Notification />

      <p>{username.value} logged in</p>
      <p>
        <button onClick={logout()}>logout</button>
      </p>

      <Toggleable buttonLabel='create new' >
        <BlogForm blogs={blogs} setBlogs={setBlogs} />
      </Toggleable>

      <BlogList blogs={blogs} setBlogs={setBlogs} />
    </div>
  )
}

BlogPage.propTypes = {
  username: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
}

export default BlogPage