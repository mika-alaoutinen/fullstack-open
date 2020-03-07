import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import { addVote } from '../reducers/anecdoteReducer'
import { resetNotification, voteNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ visibleAnecdotes, addVote, resetNotification, voteNotification }) => {

  const vote = anecdote => () => {
    addVote(anecdote)
    voteNotification(anecdote.content)
    setTimeout(() => { resetNotification()}, 5000);
  }

  return (
    <div>
      {visibleAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          clickHandler={vote(anecdote)}
        />
      )}
    </div>
  )
}

const filteredAnecdotes = ({ anecdotes, filter }) => {
  return anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a1, a2) => a2.votes - a1.votes)  
}

const mapStateToProps = state => ({
  visibleAnecdotes: filteredAnecdotes(state)
})

const mapDispatchToProps = {
  addVote, resetNotification, voteNotification,
}

export default connect(
  mapStateToProps, mapDispatchToProps)
  (AnecdoteList)