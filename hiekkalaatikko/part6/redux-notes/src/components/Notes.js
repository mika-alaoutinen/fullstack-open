import React from 'react'
import { connect } from 'react-redux'
import Note from './Note'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Notes = ({ visibleNotes, toggleImportanceOf }) => (
  <ul>
    {visibleNotes.map(note =>
      <Note
        key={note.id}
        note={note}
        handleClick={() => toggleImportanceOf(note.id)}
      />
    )}
  </ul>
)

const notesToShow = ({ notes, filter }) => {
  if (filter === 'ALL') {
    return notes
  }

  return filter === 'IMPORTANT'
    ? notes.filter(note => note.important)
    : notes.filter(note => !note.important)
}

const mapStateToProps = state => ({
  visibleNotes: notesToShow(state)
})


const mapDispatchToProps = {
  toggleImportanceOf,
}

const ConnectedNotes = connect(
  mapStateToProps, mapDispatchToProps
  )(Notes)

export default ConnectedNotes