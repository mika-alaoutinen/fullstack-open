import React from 'react'
import Anecdote from './Anecdote'
import { addVote } from '../reducers/anecdoteReducer'
import { resetNotification, voteNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const anecdotes = store
    .getState().anecdotes
    .sort((a1, a2) => a2.votes - a1.votes)

  const vote = (id, content) => () => {
    store.dispatch(addVote(id))
    store.dispatch(voteNotification(content))
    setTimeout(() => store.dispatch(resetNotification()), 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          clickHandler={vote(anecdote.id, anecdote.content)}
        />
      )}
    </div>
  )
}

export default AnecdoteList