import React from 'react'
import service from "../services/personService";

const PersonForm = ({
  persons, setPersons,
  newName, setNewName,
  newNumber, setNewNumber }) => {

  const submitForm = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    // Check if user added new person or edited an existing person:
    const existingPerson = persons.find(person => person.name === newName)
    existingPerson === undefined
      ? addPerson(newPerson)
      : editPerson(existingPerson, newPerson)
  }

  const addPerson = newPerson => {
    service.create(newPerson).then(person => {
      const mapped = persons.concat(person)
      refreshForm(mapped)
    })
  }

  const editPerson = (person, editedPerson) => {
    const confirm = window.confirm(
      `${person.name} is already added to phonebook, replace old number with a new one?`)

    if (confirm) {
      service.update(person.id, editedPerson).then(returnedPerson => {
        const mapped = persons.map(person =>
          person.id !== editPerson.id ? person : returnedPerson)

        refreshForm(mapped)
      })
    }
  }

  const refreshForm = persons => {
    setPersons(persons)
    setNewName("")
    setNewNumber("")
  }

  return (
    <form onSubmit={submitForm}>
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