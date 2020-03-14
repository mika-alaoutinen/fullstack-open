import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import About from './About'
import Anecdote from './Anecdote'
import AnecdoteList from './AnecdoteList'
import CreateNew from './CreateNew'
import Notification from './Notification'

const Menu = ({ anecdotes, setAnecdotes }) => {
  const [notification, setNotification] = useState('')

  const anecdoteById = id =>
    anecdotes.find(anecdote => anecdote.id === Number(id))
  
  const padding = { paddingRight: 5 }

  return (
    <div>
      <Router>
        <div className='links'>
          <Link style={padding} to="/">anecdotes</Link>
          <Link style={padding} to="/create">create new</Link>
          <Link style={padding} to="/about">about</Link>
        </div>

        <Notification
          notification={notification}
          setNotification={setNotification}
          timeout={10}
        />

        <div className='routes'>
          <Route exact path='/' render={() =>
            <AnecdoteList anecdotes={anecdotes} />}
          />

          <Route exact path='/create' render={() =>
            <CreateNew
              anecdotes={anecdotes}
              setAnecdotes={setAnecdotes}
              setNotification={setNotification}
            />}
          />

          <Route exact path='/about' render={() =>
            <About />}
          />

          <Route exact path='/anecdotes/:id' render={({ match }) =>
            <Anecdote anecdote={anecdoteById(match.params.id)} />
          }/>
        </div>

      </Router>
    </div>
  )
}

export default Menu