import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = ({ initAnecdotes }) => {
  useEffect(() => {
    initAnecdotes()
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { initAnecdotes })(App)