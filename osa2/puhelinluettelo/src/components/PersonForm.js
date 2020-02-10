import React from 'react'
import personService from "../services/personService";

const timeout = 5000 // timeout for messages is 5 s

const PersonForm = ({
  persons, setPersons,
  newName, setNewName,
  newNumber, setNewNumber,
  setMessage, setError}) => {
    
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

  const addPerson = newPerson => personService.create(newPerson)
      .then(person => {
        const mapped = persons.concat(person)
        refreshForm(mapped)
        showMessage(`Added ${newPerson.name}`)
      })
      .catch(error => showError(`Failed to create ${newPerson.name}`))

  const editPerson = (person, editedPerson) => {
    const confirm = window.confirm(
      `${person.name} is already added to phonebook, replace old number with a new one?`)

    if (confirm) {
      personService.update(person.id, editedPerson)
        .then(returnedPerson => {
          const mapped = persons.map(person =>
            person.id !== editPerson.id ? person : returnedPerson)

          refreshForm(mapped)
          showMessage(`Edited ${person.name}'s number`)
        })
        .catch(error => showError(`Information of ${person.name} has already been removed from server`))
    }
  }

  const refreshForm = persons => {
    setPersons(persons)
    setNewName("")
    setNewNumber("")
  }

  const showMessage = message => {
    setMessage(message)
    setTimeout(() => setMessage(null), timeout);
  }

  const showError = message => {
    setError(true)
    showMessage(message)
    setTimeout(() => setError(false), timeout)
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