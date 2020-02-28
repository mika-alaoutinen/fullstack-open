import React, { useEffect } from 'react'
import Blog from "./Blog";
import blogService from "../services/blogService";

const BlogList = ({ blogs, setBlogs }) => {

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  })

  return blogs
    .sort((blog1, blog2) => blog2.likes - blog1.likes)
    .map(blog => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />)
}

export default BlogList