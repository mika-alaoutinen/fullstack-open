const { gql } = require('apollo-server')

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addAuthor(name: String! born: Int): Author
    editAuthor(name: String! setBornTo: Int!): Author
    addBook(title: String! author: String! published: Int! genres: [String!]!): Book
    createUser(username: String! favoriteGenre: String!): User
    login(username: String! password: String!): Token
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String genre: String): [Book!]!
    genres: [String]!
    me: User
  }

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = { typeDefs }