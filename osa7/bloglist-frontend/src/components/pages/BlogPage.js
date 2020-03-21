import React from 'react'
import { useSelector } from 'react-redux'
import BlogForm from '../blog/BlogForm'
import BlogList from '../blog/BlogList'
import Notification from '../common/Notification'
import Toggleable from '../common/Toggleable'

const BlogPage = () => {
  const username = useSelector(state => state.user.username)

  const logout = () => () => {
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div className='blogPage'>
      <h2>blogs</h2>
      <Notification />

      <p>{username} logged in</p>
      <p>
        <button onClick={logout()}>logout</button>
      </p>

      <Toggleable buttonLabel='create new' >
        <BlogForm />
      </Toggleable>

      <BlogList />
    </div>
  )
}

export default BlogPage