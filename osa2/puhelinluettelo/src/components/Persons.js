import React from 'react'
import Person from "./Person";
import service from "../services/personService";

const Persons = ({ persons }) => {
  const personList = persons.map(person =>
    <div key={person.id}>
      <Person
        key={person.name}
        id={person.id}
        name={person.name}
        number={person.number}
      />
      <button onClick={() => service.deletePerson(person.id)}>delete</button>
    </div>
  )

  return <div>{personList}</div>
}

export default Persons;