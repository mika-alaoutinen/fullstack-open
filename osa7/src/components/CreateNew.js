import React, { useState } from 'react'

const CreateNew = ({ anecdotes, setAnecdotes }) => {
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [info, setInfo] = useState('')
  const [notification, setNotification] = useState('')

  const addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const handleSubmit = event => {
    event.preventDefault()
    addNew({ content, author, info, votes: 0 })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
            <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
            <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
            <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

export default CreateNew