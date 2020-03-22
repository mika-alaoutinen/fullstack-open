import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks/index'
import { addBlog } from '../../reducers/blogReducer'
import { Button, Input } from '../styles/styles'

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
        <Input { ...title } />
      </p>
      <p>author
        <Input { ...author } />
      </p>
      <p>url
        <Input { ...url } />
      </p>

      <Button type='submit'>create</Button>
    </form>
  )
}

export default BlogForm