import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../graphql/queries'

const Books = ({ show, allBooks, genres }) => {
  // Get books by genre:
  const [getBooksByGenre, result] = useLazyQuery(ALL_BOOKS)
  const [booksByGenre, setBooksByGenre] = useState(allBooks)
  const [selectedGenre, setSelectedGenre] = useState(null)

  useEffect(() => {
    if (result.data) {
      setBooksByGenre(result.data.allBooks)
    }
  }, [result])

  const renderBooks = () => booksByGenre.map(book =>
    <tr key={book.title}>
      <td>{book.title}</td>
      <td>{book.author.name}</td>
      <td>{book.published}</td>
    </tr>
  )

  const renderGenreButtons = () => genres.map(genre => 
    <button key={genre} onClick={() => selectGenre(genre)}>
      {genre}
    </button>
  )

  const selectGenre = genre => {
    getBooksByGenre({ variables: { genre } })
    setSelectedGenre(genre)
  }

  return show
    ? <div>
      <h2>books</h2>

      <div>
        in genre <b>{selectedGenre}</b>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {renderBooks()}
        </tbody>
      </table>

      {renderGenreButtons()}
    </div>

  : null
}

export default Books