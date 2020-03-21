import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return blogs === undefined
    ? []
    : blogs
      .sort((blog1, blog2) => blog2.likes - blog1.likes)
      .map(blog => <Blog key={blog.id} blog={blog} />)
}

export default BlogList