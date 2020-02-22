const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('notes', { content: 1, date: 1 })

    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
    try {
        const passwordHash = await hashPassword(request.body.password)

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

const hashPassword = async plainPassword => {
    const saltRounds = 10
    return await bcrypt.hash(plainPassword, saltRounds)
}

module.exports = usersRouter