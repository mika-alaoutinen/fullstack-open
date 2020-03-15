import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import Home from "./components/Home"
import LoginForm from "./components/LoginForm"
import NoteForm from "./components/NoteForm"
import Note from "./components/Note"
import Notes from "./components/Notes"
import Notification from "./components/Notification"
import Users from "./components/Users"
import Toggleable from "./components/Toggleable"
import noteService from './services/noteService'
import { Footer } from './components/styles'

const App = () => {
  // State management:
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

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

  const router = () => (
    <Router>
      <div>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/notes">notes</Link>
          <Link style={padding} to="/users">users</Link>
        </div>
        <Route exact path="/" render={() => <Home />} />

        <Route exact path="/notes" render={() =>
          <Notes notes={notes} showAll={showAll} setShowAll={setShowAll} />}
        />

        <Route exact path="/notes/:id" render={({ match }) =>
          <Note note={noteById(match.params.id)} />}
        />

        <Route path="/users" render={() => <Users />} />
      </div>
    </Router>
  )

  const noteById = id => notes.find(note => note.id === id)

  const noteFormRef = React.createRef()
  const padding = { padding: 5 }

  return (
    // Router-navigation:
    <div className="container">
      {router()}

      <div>
        <Notification message={errorMessage} />

        {user === null
          ? <LoginForm
            username={username} setUsername={setUsername}
            password={password} setPassword={setPassword}
            setUser={setUser} setErrorMessage={setErrorMessage}
            setMessage={setMessage}
          />
          : <div>
            {(message && <Alert variant="success">{message}</Alert>)}

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

        <Footer>
          <em>Note app, Department of Computer Science 2020</em>
        </Footer>
      </div>
    </div>
  )
}

export default App