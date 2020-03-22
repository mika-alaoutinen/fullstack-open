import React from 'react'
import { useSelector } from 'react-redux'
import { Blogs, StyledLink } from '../styles/styles'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  const sortedBlogs = () =>
    blogs
      .sort((blog1, blog2) => blog2.likes - blog1.likes)
      .map(addLink)

  const addLink = blog =>
    <Blogs key={blog.id}>
      <StyledLink to={`/blogs/${blog.id}`}>
        {blog.title}
      </StyledLink>
    </Blogs>

  return blogs === undefined ? [] : sortedBlogs()
}

export default BlogList