import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_BOOKS, CREATE_BOOK } from '../graphql/queries'

const NewBook = ({ show }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS }
    ],
  })

  if (!show) {
    return null
  }

  const resetFields = () => {
    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres([])
    setGenre('')
  }

  const submit = async event => {
    event.preventDefault()
    createBook({ variables: { title, author, published, genres } })
    resetFields()
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return show
    ? <form onSubmit={submit}>
        <div>title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>

        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>

        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>

    : null
}

export default NewBook