import React from 'react'

const Note = ({ note }) => {
  return (
    <li className='note'>
      <h2>{note.content} </h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </li>
  )
}

export default Note