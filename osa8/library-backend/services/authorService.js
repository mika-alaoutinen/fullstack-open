const Author = require('../models/author')

const findAllAuthors = async () =>
  await Author.find({})

const findAuthorByName = async name =>
  await Author.findOne({ name: name })

const createAuthor = async newAuthor => {
  const author = new Author({ ...newAuthor })

  try {
    await author.save()
  } catch (error) {
    console.log(error.message, newAuthor) // add error handling middleware
  }

  return author
}

const updateAuthor = async (authorName, newBirthDate) => {
  const author = await Author.findOne({ name: authorName }) // or args.id?

  if (!author) {
    return null
  }

  author.born = newBirthDate

  try {
    return await author.save()
  } catch (error) {
    console.log(error.message, author) // add error handling middleware
  }
}

const authorCount = () => Author.collection.countDocuments()

module.exports = {
  findAllAuthors, findAuthorByName, createAuthor, updateAuthor, authorCount
}