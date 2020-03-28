const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { UserInputError } = require('apollo-server')

const authenticate = async ({ request }) => {
  console.log('request', request)

  const authentication = request
    ? request.headers.authorization
    : null

  if (authentication && authentication.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(authentication.substring(7), config.JWT_SECRET)
    const currentUser = await User.findById(decodedToken.id)

    return { currentUser }
  }
}

const createUser = async username => {
  console.log('create user', username)
  const user = new User({ username })

  try {
    return await user.save()
  } catch (error) {
    throw new UserInputError(error.message, { invalidArgs: username })
  }
}

const login = async (username, password) => {
  console.log('login', username)
  const user = await User.findOne({ username })

  if (!user || password !== 'secret') {
    throw new UserInputError('wrong credentials')
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, config.JWT_SECRET)

  return { value: token }
}

module.exports = { authenticate, createUser, login }