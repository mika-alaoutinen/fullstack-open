import React from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogService'
import { useField } from '../hooks/index'
import { setError, setMessage } from '../reducers/notificationReducer'

const BlogForm = ({ blogs, setBlogs }) => {
  const dispatch = useDispatch()
  
  // State management:
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author} = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const resetForm = () => {
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  const newBlog = () => event => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    blogService.addBlog(newBlog)
      .then(blog => {
        setBlogs(blogs.concat(blog))
        dispatch(setMessage(`a new blog ${blog.title} by ${blog.author} added`))
        resetForm()
      })
      .catch(() => dispatch(setError('error adding blog')))
  }

  return (
    <form onSubmit={newBlog()}>

      <p>title
        <input { ...title } />
      </p>
      <p>author
        <input { ...author } />
      </p>
      <p>url
        <input { ...url } />
      </p>

      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm