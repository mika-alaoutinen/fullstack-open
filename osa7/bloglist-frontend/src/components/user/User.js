import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)
  const user = users.find(user => user.id === id)

  const renderUser = () => (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>{renderBlogs()}</ul>
    </div>
  )

  const renderBlogs = () => user.blogs.map(blog =>
    <li key={blog.id}>{blog.title}</li>
  )

  return user ? renderUser() : null
}

export default User