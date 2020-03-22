import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Li } from '../styles/styles'

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
    <Li key={blog.id}>{blog.title}</Li>
  )

  return user ? renderUser() : null
}

export default User