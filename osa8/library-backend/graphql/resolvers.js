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
    bookCount: root => authorsBookCount(root._id),
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

const authorsBookCount = async authorId => {
  const books = await Book.find({ author: authorId })
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

    return await Book
      .findById(savedBook._id)
      .populate('author', { name: 1, born: 1, bookCount: 1 })

  } catch (error) {
    console.log(error.message, newBook) // add error handling middleware
  }
}

const filterBooks = async ({ author, genre }) => {
  return !author && !genre
    ? await Book.find({}).populate('author', { name: 1, born: 1, bookCount: 1 })
    : await findBooksByAuthorOrGenre(author, genre)
}

const findBooksByAuthorOrGenre = async (authorName, genre) => {
  const author = await Author.findOne({ name: authorName })
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

module.exports = { resolvers }