import React from 'react'
import { Link } from 'react-router-dom'
import Note from './Note'
import noteService from '../services/noteService'

const Notes = ({ notes, showAll, setShowAll }) => {

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)
  
  const renderNotes = () =>
    notesToShow.map(note => 
      <li key={note.id}>
        <Link to={`/notes/${note.id}`}>{note.content}</Link>
      </li>

      // <Note key={note.id} note={note} />
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