import React from 'react'
import Anecdote from './Anecdote'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState()

  const vote = id => () => {
    console.log('vote', id)
    store.dispatch(addVote(id))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          clickHandler={vote(anecdote.id)}
        />
      )}
    </div>
  )
}

export default AnecdoteList