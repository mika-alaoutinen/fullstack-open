import React, { useEffect, useState } from 'react'
import Footer from "./components/Footer";
import Note from './components/Note'
import loginService from "./services/login";
import noteService from './services/notes'
import Notification from "./components/Notification";

const App = () => {
  // State management:
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    noteService.getAll().then(initialNotes =>
      setNotes(initialNotes))
  })
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => setErrorMessage(null))
    }
  }
  
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const toggleImportanceOf = id => {
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService.update(id, changedNote)
      .then(returnedNote => setNotes(notes.map(
        note => note.id !== id ? note : returnedNote)))
      .catch(error => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => setErrorMessage(null), 2000);
        setNotes(notes.filter(note => note.id !== id))
      })
  }
    
  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note}
      toggleImportance={() => toggleImportanceOf(note.id)}
    />
  )

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={(event) => setNewNote(event.target.value)}
      />
      <button type="submit">save</button>
    </form>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      <h2>login</h2>
      {
        user === null
        ? loginForm()
        : <div>
            <p>{user.name} logged in</p>
            {noteForm()}
          </div>
      }
      
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all" }
        </button>
      </div>

      <ul>
        {rows()}
      </ul>


      <Footer />
    </div>
  )
}

export default App