import React from 'react'

const Books = ({ show, books }) => {

  const renderBooks = () => books.map(book =>
    <tr key={book.title}>
      <td>{book.title}</td>
      <td>{book.author.name}</td>
      <td>{book.published}</td>
    </tr>
  )

  return show
    ? <div>
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

  : null
}

export default Books