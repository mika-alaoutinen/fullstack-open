const { authorCount, createAuthor, findAllAuthors, updateAuthor } = require('../services/authorService')
const { authorsBookCount, bookCount, createBook, findAllBooks } = require('../services/bookService')
const { createUser, login } = require('../services/userService')

const resolvers = {
  Mutation: {
    addAuthor: (root, args) => createAuthor(args),
    editAuthor: (root, args) => updateAuthor(args.name, args.setBornTo),
    addBook: (root, args) => createBook(args),
    createUser: (root, args) => createUser(args.username),
    login: (root, args) => login(args.username, args.password),
  },

  Query: {
    authorCount: () => authorCount(),
    bookCount: () => bookCount(),
    allAuthors: () => findAllAuthors(),
    allBooks: (root, args) => findAllBooks(args.author, args.genre),
    me: (root, args, context) => context.currentUser,
  },

  Author: {
    bookCount: root => authorsBookCount(root._id),
  },
}

module.exports = { resolvers }