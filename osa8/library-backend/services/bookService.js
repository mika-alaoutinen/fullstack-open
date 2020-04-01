const Book = require('../models/book')
const { AuthenticationError, UserInputError, PubSub } = require('apollo-server')
const { createAuthor, findAuthorByName } = require('./authorService')

const pubsub = new PubSub()

const findAllBooks = async ({ author, genre }) => {
  return !author && !genre
    ? await Book
      .find({})
      .populate('author', { name: 1, born: 1, bookCount: 1 })
    : await findBooksByAuthorOrGenre(author, genre)
}

const createBook = async (newBook, context) => {
  if (!context.currentUser) {
    throw new AuthenticationError('not authenticated')
  }

  let author = await findAuthorByName(newBook.author)

  if (!author) {
    author = await createAuthor({
      name: newBook.author,
      born: null,
    })
  }

  const book = new Book({ ...newBook, author: author._id })

  try {
    const savedBook = await book.save()
    const addedBook = await Book
      .findById(savedBook._id)
      .populate('author', { name: 1, born: 1, bookCount: 1 })

    pubsub.publish('BOOK_ADDED', { bookAdded: addedBook })
    return addedBook

  } catch (error) {
    throw new UserInputError(error.message, { invalidArgs: newBook })
  }
}

const bookCount = () => Book.collection.countDocuments()

const authorsBookCount = async authorId => {
  const books = await Book.find({ author: authorId })
  return books.length
}

const findDistinctGenres = async () => {
  const genres = await Book.distinct('genres')
  return genres.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
}

const subscribeBookAdded = () => pubsub.asyncIterator(['BOOK_ADDED'])

// Utility functions:
const findBooksByAuthorOrGenre = async (authorName, genre) => {
  const author = await findAuthorByName(authorName)
  const id = author ? author._id : null

  return await Book
    .find({ $or:
      [
        { author: id },
        { genres: { $in: [ genre ] } }
      ]
    })
    .populate('author', { name: 1, born: 1, bookCount: 1 })
}

module.exports = {
  bookCount,
  findAllBooks,
  createBook,
  authorsBookCount,
  findDistinctGenres,
  subscribeBookAdded,
}