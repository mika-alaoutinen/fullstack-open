import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { resetNotification, newAnecdoteNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {

  const addNew = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    store.dispatch(createAnecdote(content))
    store.dispatch(newAnecdoteNotification(content))
    setTimeout(() => store.dispatch(resetNotification()), 5000)
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

export default AnecdoteForm