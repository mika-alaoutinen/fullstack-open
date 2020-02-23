const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const middleware = require('../utils/middleware')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', { title: 1, author: 1, url: 1, id: 1 })

    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
    const password = request.body.password

    const errorFound = validatePassword(response, password)
    if (errorFound) {
        return
    }

    try {
        const passwordHash = await hashPassword(password)

        const user = new User({
            username: request.body.username,
            name: request.body.name,
            passwordHash,
        })

        const savedUser = await user.save()
        response.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

// Utility functions:
const hashPassword = async plainPassword => {
    const saltRounds = 10
    return await bcrypt.hash(plainPassword, saltRounds)
}

const validatePassword = (response, password) => {
    let errorFound = false

    if (password === undefined) {
        errorFound = true
        middleware.throwError(response, 400, 'missing password')
    } else if (password.length < 3) {
        errorFound = true
        const message = 'password must be at least 3 characters long'
        middleware.throwError(response, 400, message)
    }

    return errorFound
}

module.exports = usersRouter