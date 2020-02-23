const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const middleware = require('../utils/middleware')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return middleware.throwError(response, 401, 'invalid username or password')
        // return response.status(401).json({ error: 'invalid username or password' })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter