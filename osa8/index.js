const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')
let authors = require('./data/authors')
let books = require('./data/books')

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
      ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
      ): Author
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String genre: String): [Book!]!
  }
`

const resolvers = {
  Mutation: {
    addBook: (root, args) => addNewBook(args),
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      return author ? updateAuthor(author, args) : null
    },
  },
  
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allAuthors: () => authors,
    allBooks: (root, args) => filterBooks(args),
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
const addNewBook = newBook => {
  const book = { ...newBook, id: uuid() }

  if (!authors.includes(book.author)) {
    const newAuthor = {
      name: book.author,
      born: null,
      id: uuid(),
    }

    authors.push(newAuthor)
  }

  books.push(book)
  return book
}

const updateAuthor = (author, { name, setBornTo }) => {
  const updatedAuthor = { ...author, born: setBornTo }
  authors = authors.map(a => a.name === name ? updatedAuthor : a)
  return updatedAuthor
}

const filterBooks = ({ author, genre }) =>
  !author && !genre
    ? books
    : books.filter(b => b.author === author || b.genres.includes(genre))