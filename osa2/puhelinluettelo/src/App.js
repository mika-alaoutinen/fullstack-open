import React, { useEffect, useState } from 'react'
import Notification from "./components/Notification";
import Persons from "./components/Persons";
import PersonFilter from "./components/PersonFilter";
import PersonForm from "./components/PersonForm";
import service from "./services/personService";

const App = () => {
  // State management:
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState("")
  const [ newNumber, setNewNumber ] = useState("")
  const [ filter, setFilter ] = useState("")
  const [ message, setMessage ] = useState(null)
  const [ error, setError ] = useState(false)

  // Get data from server on component load:
  useEffect(() => {
    service.getAll().then(persons =>
      setPersons(persons))
  })

  const filteredPersons = () => persons.filter(person =>
      person.name.toLowerCase().includes(filter) ||
      person.number.includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <PersonFilter filter={filter} setFilter={setFilter} />

      <h3>Add new</h3>
      <PersonForm
        persons={persons} setPersons={setPersons}
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
        setMessage={setMessage} setError={setError}
      />
      
      <h3>Numbers</h3>
      <Persons persons={filteredPersons()} setMessage={setMessage} setError={setError} />
    </div>
  )
}

export default App