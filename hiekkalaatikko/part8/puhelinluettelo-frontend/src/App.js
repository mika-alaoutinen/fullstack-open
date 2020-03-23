import React from 'react'
import { gql, useQuery } from '@apollo/client'

const ALL_PERSONS = gql`
  query {
    allPersons  {
      name
      phone
      id
    }
  }
`

const App = () => {
  const result = useQuery(ALL_PERSONS)

  const getAllNames = () =>
    result.data.allPersons
      .map(p => p.name)
      .join(', ')

  return result.loading
    ? <div>loading...</div>
    : <div>{getAllNames()}</div>
}

export default App