import React from 'react'
import service from "../services/personService";

const PersonForm = ({
  persons, setPersons,
  newName, setNewName,
  newNumber, setNewNumber }) => {

  const addPerson = (event) => {
    event.preventDefault()

    // Validate new person before adding:
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    service.create(newPerson).then(person => {
      setPersons(persons.concat(person))
      setNewName("")
      setNewNumber("")
    })
  }

  return (
    <form onSubmit={addPerson}>
      <div>name:
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>

      <div>number:
        <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm