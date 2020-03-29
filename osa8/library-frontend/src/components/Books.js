import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../graphql/queries'
import BooksTable from './BooksTable'

const Books = ({ show, allBooks, genres }) => {
  // Get books by genre:
  const [booksQuery, result] = useLazyQuery(ALL_BOOKS)
  const [booksByGenre, setBooksByGenre] = useState(allBooks)
  const [selectedGenre, setSelectedGenre] = useState(null)

  useEffect(() => {
    if (result.data) {
      setBooksByGenre(result.data.allBooks)
    }
  }, [result])

  const renderGenreButtons = () => genres.map(genre => 
    <button key={genre} onClick={() => selectGenre(genre)}>
      {genre}
    </button>
  )

  const selectGenre = genre => {
    booksQuery({ variables: { genre } })
    setSelectedGenre(genre)
  }

  return show
    ? <div>
      <h2>books</h2>

      <div>
        in genre <b>{selectedGenre}</b>
      </div>

      <BooksTable books={booksByGenre} />
      {renderGenreButtons()}
    </div>

  : null
}

export default Books