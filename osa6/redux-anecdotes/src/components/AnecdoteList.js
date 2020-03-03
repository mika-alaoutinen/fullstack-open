import React from 'react'
import Anecdote from './Anecdote'
import { addVote } from '../reducers/anecdoteReducer'
import { resetNotification, voteNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {

  const vote = (id, content) => () => {
    store.dispatch(addVote(id))
    store.dispatch(voteNotification(content))
    setTimeout(() => store.dispatch(resetNotification()), 5000)
  }

  const filterAnecdotes = anecdote => {
    const filter = store.getState().filter.toLowerCase()
    const content = anecdote.content.toLowerCase()

    if (content.includes(filter)) {
      return anecdote
    }
  }

  const anecdotes = store
    .getState().anecdotes
    .filter(filterAnecdotes)
    .sort((a1, a2) => a2.votes - a1.votes)

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