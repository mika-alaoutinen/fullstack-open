import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import Notify from './components/Notify'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PhoneForm from './components/PhoneForm'
import { ALL_PERSONS } from './graphql/queries'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)

  const notify = message => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 10000)
  }
  
  return result.loading
    ? <div>loading...</div>
    : <div>
        <Notify errorMessage={errorMessage} />
        <Persons persons={result.data.allPersons} />
        <PersonForm setError={notify} />
        <PhoneForm setError={notify} />
      </div>
}

export default App