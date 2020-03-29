import React from 'react'
import UpdateAuthor from './UpdateAuthor'

const Authors = ({ show, authors }) => {

  const renderAuthors = () => authors.map(author =>
    <tr key={author.name}>
      <td>{author.name}</td>
      <td>{author.born}</td>
      <td>{author.bookCount}</td>
    </tr>
  )

  return show
    ? <div>
      <h2>authors</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>

          {renderAuthors()}

        </tbody>
      </table>

      <UpdateAuthor authors={authors} />
    </div>
    
  : null
}

export default Authors