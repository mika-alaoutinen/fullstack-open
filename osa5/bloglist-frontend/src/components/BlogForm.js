import React, { useState } from 'react'
import blogService from '../services/blogService'
import noticeService from '../services/noticeService'

const BlogForm = ({ blogs, setBlogs, setMessage, setError }) => {

  // State management:
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const resetForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const newBlog = () => event => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    blogService.addBlog(newBlog)
      .then(blog => {
        setBlogs(blogs.concat(blog))
        noticeService.showMessage(`a new blog ${title} by ${author} added`, setMessage)
        resetForm()
      })
      .catch(() => noticeService.showError('error adding blog', setMessage, setError))
  }

  return (
    <form onSubmit={newBlog()}>
      <p>title
        <input
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </p>

      <p>author
        <input
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </p>

      <p>url
        <input
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </p>

      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm