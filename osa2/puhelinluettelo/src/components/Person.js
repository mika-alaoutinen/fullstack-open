import React from 'react'
import service from "../services/personService";

const timeout = 5000 // timeout for messages is 5 s

const Person = ({ id, name, number, setMessage, setError }) => {
  const confirmDelete = () => () => {
    const confirm = window.confirm(`Delete ${name} ?`)
    if (confirm) {
      service.deletePerson(id).catch(error =>
        showError(`Information of ${name} has already been removed from server`))

      showMessage(`Deleted ${name}`)
    }
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
    <p>
      {name} {number} {"  "}
      <button onClick={confirmDelete()}>delete</button>
    </p>
  )
}

export default Person