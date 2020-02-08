import axios from "axios";
import React, { useEffect, useState } from 'react'
import Persons from "./components/Persons";
import PersonFilter from "./components/PersonFilter";
import PersonForm from "./components/PersonForm";

const App = () => {
  // State management:
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState("")
  const [ newNumber, setNewNumber ] = useState("")
  const [ filter, setFilter ] = useState("")

  // Get data from server:
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const filteredPersons = () => persons.filter(person =>
      person.name.toLowerCase().includes(filter) ||
      person.number.includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonFilter filter={filter} setFilter={setFilter} />

      <h3>Add new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      
      <h3>Numbers</h3>
      <Persons persons={filteredPersons()} />
    </div>
  )
}

export default App