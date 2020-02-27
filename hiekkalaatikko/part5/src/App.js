import React, { useEffect, useState } from 'react'
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import Note from './components/Note'
import NoteForm from "./components/NoteForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
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
  
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const toggleImportanceOf = id => {
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService.update(id, changedNote)
      .then(returnedNote => setNotes(notes.map(
        note => note.id !== id ? note : returnedNote)))
      .catch(() => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => setErrorMessage(null), 2000);
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const logout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note}
      toggleImportance={() => toggleImportanceOf(note.id)}
    />
  )

  return (
    <div>
      <h1>Notes</h1>
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

            <Toggleable buttonLabel='new note'>
              <NoteForm
                notes={notes} setNotes={setNotes}
                newNote={newNote} setNewNote={setNewNote}
              />
            </Toggleable>
          </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all" }
        </button>
      </div>

      <ul>{rows()}</ul>

      <Footer />
    </div>
  )
}

export default App