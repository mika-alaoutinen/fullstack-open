const uuid = require('uuid/v1')
let authors = require('../data/authors')
let books = require('../data/books')

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

module.exports = { resolvers }