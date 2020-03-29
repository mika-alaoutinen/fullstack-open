const { authorCount, createAuthor, findAllAuthors, updateAuthor } = require('../services/authorService')
const { authorsBookCount, bookCount, createBook, findAllBooks } = require('../services/bookService')
const { createUser, login } = require('../services/userService')

const resolvers = {
  Mutation: {
    addAuthor: (root, args) => createAuthor(args),
    editAuthor: (root, args, context) => updateAuthor(args, context),
    addBook: (root, args, context) => createBook(args, context),
    createUser: (root, args) => createUser(args),
    login: (root, args) => login(args),
  },

  Query: {
    authorCount: () => authorCount(),
    bookCount: () => bookCount(),
    allAuthors: () => findAllAuthors(),
    allBooks: (root, args) => findAllBooks(args),
    me: (root, args, context) => context.currentUser,
  },

  Author: {
    bookCount: root => authorsBookCount(root._id),
  },
}

module.exports = { resolvers }