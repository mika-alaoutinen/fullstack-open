const { createAuthor, findAuthorByName } = require('./authorService')
const Book = require('../models/book')

const findAllBooks = async (author, genre) => {
  return !author && !genre
    ? await Book
      .find({})
      .populate('author', { name: 1, born: 1, bookCount: 1 })
    : await findBooksByAuthorOrGenre(author, genre)
}

const createBook = async newBook => {
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

    return await Book
      .findById(savedBook._id)
      .populate('author', { name: 1, born: 1, bookCount: 1 })

  } catch (error) {
    console.log(error.message, newBook) // add error handling middleware
  }
}

const bookCount = () => Book.collection.countDocuments()

const authorsBookCount = async authorId => {
  const books = await Book.find({ author: authorId })
  return books.length
}

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
  bookCount, findAllBooks, createBook, authorsBookCount
}