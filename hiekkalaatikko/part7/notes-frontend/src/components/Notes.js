import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Notes = ({ notes, showAll, setShowAll }) => {

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const renderNotes = () => notesToShow.map(note =>
    <tr key={note.id}>
      <td>
        <Link to={`/notes/${note.id}`}>{note.content}</Link>
      </td>
      <td>
        {note.user === undefined || note.user === null ? '-' : note.user.name}
      </td>
    </tr>
  )

  return (
    <div>
      <h2>Notes</h2>
      <Table striped>
        <tbody>
          {renderNotes()}
        </tbody>
      </Table>
    </div>
  )
}

export default Notes