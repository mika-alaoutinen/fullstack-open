import React from 'react'
import noteService from "../services/notes";

const NoteForm = ({ notes, setNotes, newNote, setNewNote, user }) => {

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }
  
  return (
    <div>
      <p>{user.name} logged in</p>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm