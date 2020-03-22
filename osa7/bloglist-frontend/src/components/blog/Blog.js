import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BlogComments from './BlogComments'
import { likeBlog, deleteBlog } from '../../reducers/blogReducer'

const Blog = () => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)

  const dispatch = useDispatch()
  const history = useHistory()

  // click handlers:
  const addLike = () => () => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = () => () => {
    const confirm = window.confirm(`remove blog ${blog.title} by ${blog.author}?`)
    if (confirm) {
      dispatch(deleteBlog(blog.id))
      history.push('/')
    }
  }

  const renderDeleteButton = () => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return user.username === blog.user.username
      ? <button onClick={removeBlog()}>remove</button>
      : null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }

  const renderBlog = () =>
    <div style={blogStyle}>
      <h2>{blog.title} {blog.author}</h2>

      <div>{blog.url}</div>

      <div>
        {blog.likes} likes
        <button onClick={addLike()}>like</button>
      </div>

      <div>added by {blog.user.name}</div>

      {renderDeleteButton()}

      <BlogComments blog={blog} />
    </div>

  return blog ? renderBlog() : null
}

export default Blog