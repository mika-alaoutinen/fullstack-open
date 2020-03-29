import React from 'react'

const BooksTable = ({ books }) => {

  const renderBooks = () => books.map(book =>
    <tr key={book.title}>
      <td>{book.title}</td>
      <td>{book.author.name}</td>
      <td>{book.published}</td>
    </tr>
  )

  return (
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
  )
}

export default BooksTable