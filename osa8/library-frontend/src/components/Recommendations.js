import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import BooksTable from './BooksTable'
import { ALL_BOOKS } from '../graphql/queries'

const Recommendations = ({ show, genre }) => {

  const [booksQuery, result] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])

  // Retrieve user's recommended books from server:
  useEffect(() => {
    if (books.length === 0) {
      booksQuery({ variables: { genre } })
    }
  }, [books]) // eslint-disable-line react-hooks/exhaustive-deps

  // Save books received from server:
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result]) // eslint-disable-line react-hooks/exhaustive-deps

  return show
    ? <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <b>{genre}</b>
      </div>
      <BooksTable books={books} />
    </div>

    : null
}

export default Recommendations