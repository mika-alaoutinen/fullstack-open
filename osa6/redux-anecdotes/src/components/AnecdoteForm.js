import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { resetNotification, newAnecdoteNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ createAnecdote, resetNotification, newAnecdoteNotification }) => {

  const addNew = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    const newAnecdote = { content, votes: 0 }
    createAnecdote(newAnecdote)
    newAnecdoteNotification(newAnecdote.content)

    setTimeout(() => { resetNotification()}, 5000)
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addNew}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
      
    </div>
  )
}

export default connect(
  null, { createAnecdote, resetNotification, newAnecdoteNotification })
  (AnecdoteForm)