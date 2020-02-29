import React from 'react'
import blogService from '../services/blogService'
import noticeService from '../services/noticeService'
import { useField } from '../hooks/index'

const BlogForm = ({ blogs, setBlogs, setMessage, setError }) => {

  // State management:
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const t = Object.assign({}, title)
  delete t.reset

  const a = Object.assign({}, author)
  delete a.reset

  const u = Object.assign({}, url)
  delete u.reset

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
        <input { ...t } />
      </p>
      <p>author
        <input { ...a } />
      </p>
      <p>url
        <input { ...u } />
      </p>

      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm