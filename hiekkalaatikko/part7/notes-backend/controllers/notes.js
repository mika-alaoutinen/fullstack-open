const jwt = require('jsonwebtoken')
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
    const notes = await Note
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(notes.map(note => note.toJSON()))
})

notesRouter.get('/:id', async (request, response, next) => {
    try {
        const note = await Note.findById(request.params.id)
        note
            ? response.json(note.toJSON())
            : response.status(404).end()
    } catch (exception) {
        next(exception)
    }
})

notesRouter.post('/', async (request, response, next) => {
    const body = request.body
    const token = getTokenFrom(request)

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        }
    
        const user = await User.findById(decodedToken.id)
        
        const note = new Note({
            content: body.content,
            important: body.important || false,
            date: new Date(),
            user: user._id
        })

        const savedNote = await note.save()
        user.notes = user.notes.concat(savedNote._id)
        await user.save()
        response.json(savedNote.toJSON())
    } catch (exception) {
        next(exception)
    }
})

notesRouter.delete('/:id', async (request, response, next) => {
    try {
        await Note.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

notesRouter.put('/:id', (request, response, next) => {
    const note = {
        content: request.body.content,
        important: request.body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(note => note.toJSON())
        .then(note => response.json(note))
        .catch(error => next(error))
})

// Utility functions:
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    return authorization && authorization.toLowerCase().startsWith('bearer ')
        ? authorization.substring(7)
        : null
}

module.exports = notesRouter