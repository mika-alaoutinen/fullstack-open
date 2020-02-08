import React from 'react'
import Person from "./Person";

const Persons = ({ persons }) => {
  const personList = persons.map(person =>
    <Person
      key={person.name}
      name={person.name}
      phonenumber={person.phonenumber}
    />
  )

  return <div>{personList}</div>
}

export default Persons;