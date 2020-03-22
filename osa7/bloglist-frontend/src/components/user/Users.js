import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Td, Th } from '../styles/styles'

const UsersPage = () => {
  const users = useSelector(state => state.users)

  const renderTableBody = () => users.map(user =>
    <tr key={user.id}>
      <Td>
        <Link to={`/users/${user.id}`}>
          {user.name}
        </Link>
      </Td>
      <Td>
        {user.blogs.length}
      </Td>
    </tr>
  )

  return (
    <div>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <Th></Th>
            <Th>blogs created</Th>
          </tr>
        </thead>

        <tbody>
          {renderTableBody()}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage