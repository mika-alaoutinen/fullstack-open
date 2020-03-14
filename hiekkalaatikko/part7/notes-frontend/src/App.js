import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import Footer from "./components/Footer"
import Home from "./components/Home"
import LoginForm from "./components/LoginForm"
import NoteForm from "./components/NoteForm"
import Notes from "./components/Notes"
import Notification from "./components/Notification"
import Users from "./components/Users"
import Toggleable from "./components/Toggleable"
import noteService from './services/noteService'

const App = () => {
  // State management:
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  
  // Load notes on page load:
  useEffect(() => {
    noteService.getAll().then(initialNotes =>
      setNotes(initialNotes))
  })

  // Check if user credentials are in local storage:
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const noteFormRef = React.createRef()

  const padding = { padding: 5 }

  return (
    // Router-navigation:
    <div>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/">home</Link>
            <Link style={padding} to="/notes">notes</Link>
            <Link style={padding} to="/users">users</Link>
          </div>
          <Route exact path="/" render={() => <Home />} />

          <Route path="/notes" render={() =>
            <Notes
              notes={notes} setNotes={setNotes}
              showAll={showAll} setShowAll={setShowAll}
              setErrorMessage={setErrorMessage}
            />}
          />
          
          <Route path="/users" render={() => <Users />} />
        </div>
      </Router>

      <div>
        <Notification message={errorMessage} />

        {user === null
          ? <LoginForm
              username={username} setUsername={setUsername}
              password={password} setPassword={setPassword}
              setUser={setUser} setErrorMessage={setErrorMessage}
            />
          : <div>
              <p>{user.name} logged in</p>
              <button onClick={() => logout()}>log out</button>

              <Toggleable buttonLabel='new note' ref={noteFormRef}>
                <NoteForm
                  notes={notes} setNotes={setNotes}
                  newNote={newNote} setNewNote={setNewNote}
                  noteFormRef={noteFormRef}
                />
              </Toggleable>
            </div>
        }

        <Footer />
      </div>
    </div>
  )
}

export default App