import React from 'react'
import BlogForm from "./BlogForm";
import BlogList from "./BlogList"
import Notification from "./Notification"

const BlogPage = ({
  userName, blogs, setBlogs, message, setMessage, error, setError }) => {

  const logout = () => () => {
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} error={error} />

      <p>
        {userName} logged in
        <button onClick={logout()}>logout</button>
      </p>

      <BlogForm
        blogs={blogs} setBlogs={setBlogs}
        setMessage={setMessage}
        setError={setError}
      />

      <BlogList blogs={blogs} setBlogs={setBlogs} />
    </div>
  )
}

export default BlogPage