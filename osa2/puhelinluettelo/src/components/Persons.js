import React from 'react'
import Person from "./Person";

const Persons = ({ persons }) => {
  const personList = persons.map(person =>
    <Person
      key={person.name}
      name={person.name}
      number={person.number}
    />
  )

  return <div>{personList}</div>
}

export default Persons;