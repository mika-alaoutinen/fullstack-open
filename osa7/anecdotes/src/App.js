import React, { useState } from 'react'
import initialAnecdotes from './initialAnecdotes'
import Footer from './components/Footer'
import Menu from './components/Menu'

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes)

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} setAnecdotes={setAnecdotes} />
      <Footer />
    </div>
  )
}

export default App