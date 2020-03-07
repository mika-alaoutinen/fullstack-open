import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes, addVote, setNotification }) => {

  const vote = anecdote => () => {
    addVote(anecdote)
    setNotification(`you voted '${anecdote.content}'`, 3)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
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
  anecdotes: filteredAnecdotes(state)
})

const mapDispatchToProps = {
  addVote,
  setNotification,
}

export default connect(
  mapStateToProps, mapDispatchToProps)
  (AnecdoteList)