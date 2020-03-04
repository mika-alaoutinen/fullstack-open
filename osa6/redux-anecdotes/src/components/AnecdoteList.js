import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import { addVote } from '../reducers/anecdoteReducer'
import { resetNotification, voteNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({
  anecdotes, addVote, resetNotification, voteNotification }) => {

  const vote = (id, content) => () => {
    addVote(id)
    voteNotification(content)
    setTimeout(() => { resetNotification()}, 5000);
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

const filteredAnecdotes = state => {
  const { anecdotes, filter } = state

  return anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a1, a2) => a2.votes - a1.votes)
}

const mapStateToProps = state => ({
    anecdotes: filteredAnecdotes(state)
})

const mapDispatchToProps = {
  addVote, resetNotification, voteNotification,
}

export default connect(
  mapStateToProps, mapDispatchToProps)
  (AnecdoteList)