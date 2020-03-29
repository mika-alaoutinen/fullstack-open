import React from 'react'

const Books = ({ show, books }) => {
  if (!show) {
    return null
  }

  const renderBooks = () => books.map(b =>
    <tr key={b.title}>
      <td>{b.title}</td>
      <td>{b.author}</td>
      <td>{b.published}</td>
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