const Author = require('../models/author')
const Book = require('../models/book')

const resolvers = {
  Mutation: {
    // Authors:
    addAuthor: (root, args) => addNewAuthor(args),
    editAuthor: (root, args) => {
      const author = Author.findOne({ name: args.name }) // or args.id?
      return author ? updateAuthor(author, args) : null
    },

    // Books:
    addBook: (root, args) => addNewBook(args),
  },

  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: () => Author.find({}),
    allBooks: (root, args) => filterBooks(args),
  },

  Author: {
    bookCount: root => authorsBookCount(root.name),
  },
}

// Utility functions:
// Author:
const addNewAuthor = async newAuthor => {
  const author = new Author({ ...newAuthor })

  try {
    await author.save()
  } catch (error) {
    console.log(error.message, newAuthor) // add error handling middleware
  }

  return author
}

const updateAuthor = async (author, { setBornTo }) => {
  author.born = setBornTo

  try {
    return await author.save()
  } catch (error) {
    console.log(error.message, author) // add error handling middleware
  }
}

const authorsBookCount = async ({ authorName }) => {
  // books.filter(b => b.author === root.name).length,
  const books = await Book.find({ author: authorName })
  console.log('authorsBookCount', books)
  return books.length
}

// Book:
const addNewBook = async newBook => {
  const author = await Author.findOne({ name: newBook.author })
  const book = new Book({ ...newBook, author: author._id })

  try {
    if (!author) {
      const newAuthor = new Author({
        name: book.author,
        born: null,
      })
      await newAuthor.save()
    }

    const savedBook = await book.save()
    return savedBook.populate('author', { name: 1, born: 1, bookCount: 1 })
  } catch (error) {
    console.log(error.message, newBook) // add error handling middleware
  }
}

const filterBooks = async ({ author, genre }) => {
  return !author && !genre
    ? await Book.find({}).populate('author', { name: 1, born: 1, bookCount: 1 })
    : findByAuthor(author)
    // : await Book.find({ $or:
    //   [
    //     { author: author },
    //     { genres: { $in: [ genre ] } }
    //   ]
    // }).populate('author', { name: 1, born: 1, bookCount: 1 })
}

const findByAuthor = async (authorName) => {
  const author = await Author.findOne({ name: authorName })
  const books = await Book
    .find({ author: author._id })
    .populate('author', { name: 1, born: 1, bookCount: 1 })

  return books
}

module.exports = { resolvers }