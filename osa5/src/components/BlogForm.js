import React from 'react'
import blogService from '../services/blogService'
import noticeService from '../services/noticeService'
import { useField } from '../hooks/index'

const BlogForm = ({ blogs, setBlogs, setMessage, setError }) => {

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