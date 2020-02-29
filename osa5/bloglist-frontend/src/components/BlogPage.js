import React from 'react'
import PropTypes from 'prop-types'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Notification from './Notification'
import Toggleable from './Toggleable'

const BlogPage = ({
  username, blogs, setBlogs, message, setMessage, error, setError }) => {

  const logout = () => () => {
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} error={error} />

      <p>
        {username} logged in
        <button onClick={logout()}>logout</button>
      </p>

      <Toggleable buttonLabel='new note' >
        <BlogForm
          blogs={blogs} setBlogs={setBlogs}
          setMessage={setMessage}
          setError={setError}
        />
      </Toggleable>

      <BlogList blogs={blogs} setBlogs={setBlogs} />
    </div>
  )
}

BlogPage.propTypes = {
  username: PropTypes.string.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired
}

export default BlogPage