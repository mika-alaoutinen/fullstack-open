import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UsersPage = () => {
  const users = useSelector(state => state.users)
  
  const renderTableBody = () => users.map(user =>
    <tr key={user.id}>
      <td>
        <Link to={`/users/${user.id}`}>
          {user.name}
        </Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  )

  return (
    <div>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
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