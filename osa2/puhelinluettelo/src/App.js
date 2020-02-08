import React, { useState } from 'react'
import Persons from "./components/Persons";
import PersonFilter from "./components/PersonFilter";
import PersonForm from "./components/PersonForm";

const App = () => {
  // State management:
  const [ persons, setPersons] = useState([
    { name: "Arto Hellas", phonenumber: "040-1234567" },
    { name: "Arto Hellas2", phonenumber: "040-7654321" },
    { name: "Ada Lovelace", phonenumber: "050-7654321" },
  ])
  const [ newName, setNewName ] = useState("")
  const [ newPhonenumber, setNewPhonenumber ] = useState("")
  const [ filter, setFilter ] = useState("")

  const filteredPersons = () => persons.filter(person =>
      person.name.toLowerCase().includes(filter) ||
      person.phonenumber.includes(filter))

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
        newPhonenumber={newPhonenumber}
        setNewPhonenumber={setNewPhonenumber}
      />
      
      <h3>Numbers</h3>
      <Persons persons={filteredPersons()} />
    </div>
  )
}

export default App