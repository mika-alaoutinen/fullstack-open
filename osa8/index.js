const { ApolloServer, gql } = require('apollo-server')
const authors = require('./data/authors')
const books = require('./data/books')

const typeDefs = gql`
  type Author {
    name: String!
    born: Int!
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allAuthors: [Author!]!
    allBooks: [Book!]!
  }
`

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allAuthors: () => authors,
    allBooks: () => books,
  },

  Author: {
    bookCount: root => books.filter(b => b.author === root.name).length,
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

// Utility functions
