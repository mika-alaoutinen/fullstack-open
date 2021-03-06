import React from 'react'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Notification from '../common/Notification'
import Toggleable from '../common/Toggleable'

const BlogPage = () => {

  return (
    <div className='blogPage'>
      <h2>blogs</h2>
      <Notification />

      <Toggleable buttonLabel='create new' >
        <BlogForm />
      </Toggleable>

      <BlogList />
    </div>
  )
}

export default BlogPage