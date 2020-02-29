import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'
import blogService from '../services/blogService'

const BlogList = ({ blogs, setBlogs }) => {

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  })

  return blogs
    .sort((blog1, blog2) => blog2.likes - blog1.likes)
    .map(blog => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />)
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default BlogList