import React from 'react'
import noteService from "../services/noteService";

const NoteForm = ({ notes, setNotes, newNote, setNewNote, noteFormRef }) => {

  const addNote = (event) => {
    event.preventDefault()
    noteFormRef.current.toggleVisibility()

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
      <h2>Create a new note</h2>
      
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