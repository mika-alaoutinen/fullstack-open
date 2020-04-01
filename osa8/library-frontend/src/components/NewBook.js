import React, { useState } from 'react'
import { useMutation, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED, CREATE_BOOK } from '../graphql/queries'

const NewBook = ({ show, setMessage, updateCacheWith }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: error => setMessage(error.graphQLErrors[0].message),
    update: response => updateCacheWith(response.data.addBook)
  })

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)      
      setMessage(`new book "${addedBook.title}" added`)
    }
  })

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