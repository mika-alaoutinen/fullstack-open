import React from 'react'
import Person from "./Person";

const Persons = ({ persons, setMessage, setError }) => {
  const personList = persons.map(person =>
    <Person
      key={person.name}
      id={person.id}
      name={person.name}
      number={person.number}
      setMessage={setMessage}
      setError={setError}
    />
  )

  return <div>{personList}</div>
}

export default Persons;