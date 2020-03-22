const { ApolloServer, UserInputError, gql } = require('apollo-server')
const uuid = require('uuid/v1')
let persons = require('./persons')

const typeDefs = gql`
  type Address {
    street: String!
    city: String! 
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Mutation {
    addPerson(name: String! phone: String street: String! city: String!): Person
  }

  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
  }
`

const resolvers = {
  Mutation: {
    addPerson: (root, args) => {
      validateNewPerson(args)
      return addNewPerson(args)
    }
  },
  
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) => persons.find(p => p.name === args.name),
  },

  Person: {
    address: root => ({
      street: root.street,
      city: root.city,
    })
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

// Utility functions:
const addNewPerson = person => {
  const newPerson = { ...person, id: uuid() }
  persons = persons.concat(newPerson)
  return newPerson
}

const validateNewPerson = (person) => {
  if (persons.find(p => p.name === person.name)) {
    throw new UserInputError('Name must be unique', {
      invalidArgs: person.name,
    })
  }
}