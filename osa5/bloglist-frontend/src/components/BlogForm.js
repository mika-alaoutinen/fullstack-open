import React from 'react'
import blogService from '../services/blogService'
import noticeService from '../services/noticeService'
import { useField } from '../hooks/index'

const BlogForm = ({ blogs, setBlogs, setMessage, setError }) => {

  // State management:
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const resetForm = () => {
    title.reset()
    author.reset()
    url.reset()
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
        noticeService.showMessage(`a new blog ${title.value} by ${author.value} added`, setMessage)
        resetForm()
      })
      .catch(() => noticeService.showError('error adding blog', setMessage, setError))
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