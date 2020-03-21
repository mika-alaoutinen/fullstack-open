import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  const style = {
    border: 'solid',
    borderWidth: 1,
    margin: 2,
    padding: 5,
  }

  const sortedBlogs = () =>
    blogs
      .sort((blog1, blog2) => blog2.likes - blog1.likes)
      .map(addLink)

  const addLink = blog =>
    <div key={blog.id} style={style}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link>
    </div>

  return blogs === undefined ? [] : sortedBlogs()
}

export default BlogList