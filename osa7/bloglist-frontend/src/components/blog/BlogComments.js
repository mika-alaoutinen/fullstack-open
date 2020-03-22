import React from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../../reducers/blogReducer'
import { useField } from '../../hooks/index'
import { Button, Input } from '../styles/styles'

const BlogComments = ({ blog }) => {
  const dispatch = useDispatch()
  
  // State management for the form field:
  const { reset: resetComment, ...comment } = useField('text')

  const newComment = () => event => {
    event.preventDefault()
    const newComment = { comment: comment.value }
    dispatch(addComment(blog.id, newComment))
    resetComment()
  }
  
  const renderComments = () =>
    blog.comments.map(comment =>
      <li key={comment}>{comment}</li>
    )

  return (
    <div className='comments'>
      <h3>comments</h3>

      <form onSubmit={newComment()}>
        <Input { ...comment } />
        <Button type='submit'>add comment</Button>
      </form>

      <ul>{renderComments()}</ul>
    </div>
    
  )
}

export default BlogComments