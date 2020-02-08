import React from 'react'

const PersonForm = ({
  persons, setPersons,
  newName, setNewName,
  newPhonenumber, setNewPhonenumber }) => {

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
  )
}

export default PersonForm