import React, { useState } from 'react'
import blogService from '../services/blogService'

const Blog = ({ blog, blogs, setBlogs }) => {

  // Expand and collapse blog info:
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => setVisible(!visible)

  const addLike = () => async () => {
    const likedBlog = { ...blog }
    likedBlog.likes += 1

    try {
      const editedBlog = await blogService.editBlog(likedBlog.id, likedBlog)

      setBlogs(blogs.map(blog =>
        blog.id === editedBlog.id ? editedBlog : blog))
    } catch (error) {
      console.error(error)
    }
  }

  const deleteBlog = () => () => {
    const confirm = window.confirm(`remove blog ${blog.title} by ${blog.author}?`)
    if (confirm) {
      blogService.deleteBlog(blog.id)
    }
  }

  const renderDeleteButton = () => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return user.username === blog.user.username
      ? <button onClick={deleteBlog()}>remove</button>
      : null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <div onClick={toggleVisibility} style={hideWhenVisible} className='blogHeader'>
        {blog.title} {blog.author}
      </div>

      <div onClick={toggleVisibility} style={showWhenVisible} className='blogBody'>
        <div>{blog.title} {blog.author}</div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes
          <button onClick={addLike()}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
        {renderDeleteButton()}
      </div>

    </div>
  )
}

export default Blog