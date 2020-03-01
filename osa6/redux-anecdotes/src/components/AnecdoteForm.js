import React from 'react'

const AnecdoteForm = ({ store }) => {

  const addNew = () => {
    console.log('add new anecdote')
  }
  
  return (
    <form onSubmit={addNew}>
      <div>
        <input></input>
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm