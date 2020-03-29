import React from 'react'

const Books = ({ show, books }) => {
  if (!show) {
    return null
  }

  const renderBooks = () => books.map(book =>
    <tr key={book.title}>
      <td>{book.title}</td>
      <td>{book.author.name}</td>
      <td>{book.published}</td>
    </tr>
  )

  return (
    <div>
      <h2>books</h2>

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
    </div>
  )
}

export default Books