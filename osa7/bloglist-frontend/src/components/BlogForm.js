import React from 'react'
import blogService from '../services/blogService'
import { useField } from '../hooks/index'

const BlogForm = ({ blogs, setBlogs, setMessage, setError }) => {

  // State management:
  const { reset: {}, ...title } = useField('text')
  const { reset: {}, ...author} = useField('text')
  const { reset: {}, ...url } = useField('text')

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
        // TODO: notification message: `a new blog ${title.value} by ${author.value} added`
        resetForm()
      })
      .catch(() => console.log('error adding blog'))
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