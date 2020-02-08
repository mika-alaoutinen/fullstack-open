import React, { useState } from 'react'
import Persons from "./components/Persons";

const App = () => {
  // State management:
  const [ persons, setPersons] = useState([
    { name: "Arto Hellas", phonenumber: "040-1234567" },
    { name: "Arto Hellas2", phonenumber: "040-7654321" }
  ])
  const [ newName, setNewName ] = useState("")
  const [ newPhonenumber, setNewPhonenumber ] = useState("")

  const addPerson = (event) => {
    event.preventDefault()

    // Validate new person before adding:
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    
    const newPerson = {
      name: newName,
      phonenumber: newPhonenumber,
    }

    setPersons(persons.concat(newPerson))
    setNewName("")
    setNewPhonenumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>name:
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>

        <div>number: 
          <input
            value={newPhonenumber}
            onChange={(event) => setNewPhonenumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )

}

export default App