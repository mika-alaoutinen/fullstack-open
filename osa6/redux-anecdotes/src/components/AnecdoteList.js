import React from 'react'
import Anecdote from './Anecdote'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {
  const anecdotes = store
    .getState().anecdotes
    .sort((a1, a2) => a2.votes - a1.votes)

  const vote = id => () => store.dispatch(addVote(id))

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