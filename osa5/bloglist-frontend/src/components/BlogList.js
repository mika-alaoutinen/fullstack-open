import React, { useEffect } from 'react'
import Blog from "./Blog";
import blogService from "../services/blogService";

const BlogList = ({ blogs, setBlogs }) => {

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  })

  return blogs.map(blog => <Blog key={blog.id} blog={blog} />)
}

export default BlogList