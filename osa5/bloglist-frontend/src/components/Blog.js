import React, { useState } from 'react'

const Blog = ({ blog }) => {

  // Expand and collapse blog info:
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => setVisible(!visible)

  const addLike = () => () => {
    console.log('+1 like');
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility} style={hideWhenVisible}>
        {blog.title} {blog.author}
      </div>
      
      <div onClick={toggleVisibility} style={showWhenVisible}>
        <div>{blog.title} {blog.author}</div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes
          <button onClick={addLike()}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
      </div>
      
    </div>
  )
}

export default Blog