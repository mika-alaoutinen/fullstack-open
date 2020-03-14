import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import About from './About'
import Anecdote from './Anecdote'
import CreateNew from './CreateNew'
import AnecdoteList from './AnecdoteList'


const Menu = ({ anecdotes, setAnecdotes }) => {
  
  const anecdoteById = id =>
    anecdotes.find(anecdote => anecdote.id === Number(id))
  
  const padding = { paddingRight: 5 }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>

      <Route exact path='/' render={() =>
        <AnecdoteList anecdotes={anecdotes} />}
      />

      <Route exact path='/create' render={() =>
        <CreateNew anecdotes={anecdotes} setAnecdotes={setAnecdotes} />}
      />

      <Route exact path='/about' render={() =>
        <About />}
      />

      <Route exact path='/anecdotes/:id' render={({ match }) =>
        <Anecdote anecdote={anecdoteById(match.params.id)} />
      }/>

    </Router>
  )
}

export default Menu