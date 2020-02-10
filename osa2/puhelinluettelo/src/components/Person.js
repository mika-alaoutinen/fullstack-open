import React from 'react'
import service from "../services/personService";

const Person = ({ id, name, number, setMessage }) => {
  const confirmDelete = () => () => {
    const confirm = window.confirm(`Delete ${name} ?`)
    if (confirm) {
      service.deletePerson(id)
      showMessage(`Deleted ${name}`)
    }
  }

  const showMessage = message => {
    setMessage(message)
    setTimeout(() => setMessage(null), 2000);
  }

  return (
    <p>
      {name} {number} {"  "}
      <button onClick={confirmDelete()}>delete</button>
    </p>
  )
}

export default Person