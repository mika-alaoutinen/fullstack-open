import React from 'react'
import { Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => {

  const renderAnecdotes = () => anecdotes.map(anecdote =>
    <li key={anecdote.id}>
      <Link to={`/anecdotes/${anecdote.id}`}>
        {anecdote.content}
      </Link>
    </li>
  )
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        { renderAnecdotes() }
      </ul>
    </div>
  )
}

export default AnecdoteList