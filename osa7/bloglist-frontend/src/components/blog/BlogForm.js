import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks/index'
import { addBlog } from '../../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  // State management for the form fields:
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
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

    dispatch(addBlog(newBlog))
    resetForm()
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