import React from 'react'
import BlogList from "./BlogList"

const BlogPage = ({ userName, blogs, setBlogs }) => {

  const logout = () => () => {
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {userName} logged in
        <button onClick={logout()}>logout</button>
      </p>
      <BlogList blogs={blogs} setBlogs={setBlogs} />
    </div>
  )
}

export default BlogPage