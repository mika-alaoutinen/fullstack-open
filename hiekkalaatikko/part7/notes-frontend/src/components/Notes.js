import React from 'react'
import Note from './Note'
import noteService from '../services/noteService'

const Notes = ({ notes, setNotes, showAll, setShowAll, setErrorMessage }) => {

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

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)
  
  const renderNotes = () =>
    notesToShow.map(note => 
      <Note
        key={note.id}
        note={note}
        toggleImportance={() => toggleImportanceOf(note.id)}
      />
    )
  
  return (
    <div>
      <h2>Notes</h2>
      { renderNotes() }
      
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all" }
      </button>
    </div>
  )
}

export default Notes