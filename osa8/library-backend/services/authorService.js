const Author = require('../models/author')
const { AuthenticationError, UserInputError } = require('apollo-server')

const findAllAuthors = async () =>
  await Author.find({})

const findAuthorByName = async name =>
  await Author.findOne({ name })

const createAuthor = async newAuthor => {
  const author = new Author({ ...newAuthor })

  try {
    await author.save()
  } catch (error) {
    throw new UserInputError(error.message, { invalidArgs: newAuthor })
  }

  return author
}

const updateAuthor = async ({ name, setBornTo }, context) => {
  if (!context.currentUser) {
    throw new AuthenticationError('not authenticated')
  }

  const author = await Author.findOne({ name })
  if (!author) {
    return null
  }

  author.born = setBornTo

  try {
    return await author.save()
  } catch (error) {
    throw new UserInputError(error.message, { invalidArgs: { name, setBornTo } })
  }
}

const authorCount = () => Author.collection.countDocuments()

module.exports = {
  findAllAuthors, findAuthorByName, createAuthor, updateAuthor, authorCount
}