import React from 'react'
import service from "../services/personService";

const Person = ({ id, name, number }) => {
  const confirmDelete = () => () => {
    const confirm = window.confirm(`Delete ${name} ?`)
    if (confirm) {
      service.deletePerson(id)
    }
  }

  return (
    <p>
      {name} {number} {"  "}
      <button onClick={confirmDelete()}>delete</button>
    </p>
  )
}

export default Person