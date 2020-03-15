const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const user = await User.findOne({ username: request.body.username })
    const passwordCorrect = validatePassword(user, request.body.password)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({ error: 'invalid username or password' })
    }

    const token = signToken(user)
    response.status(200).send({ token, username: user.username, name: user.name })
})

// Utility functions:
const validatePassword = async (user, password) => {
    return user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)
}

const signToken = user => {
    const userForToken = {
        username: user.username,
        id: user._id,
    }

    return jwt.sign(userForToken, process.env.SECRET)
}

module.exports = loginRouter