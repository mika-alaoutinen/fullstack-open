const { authorCount, createAuthor, findAllAuthors, updateAuthor } = require('../services/authorService')
const { authorsBookCount, bookCount, createBook, findAllBooks } = require('../services/bookService')

const resolvers = {
  Mutation: {
    addAuthor: (root, args) => createAuthor(args),
    editAuthor: (root, args) => updateAuthor(args.name, args.setBornTo),
    addBook: (root, args) => createBook(args),
  },

  Query: {
    authorCount: () => authorCount(),
    bookCount: () => bookCount(),
    allAuthors: () => findAllAuthors(),
    allBooks: (root, args) => findAllBooks(args.author, args.genre),
  },

  Author: {
    bookCount: root => authorsBookCount(root._id),
  },
}

module.exports = { resolvers }