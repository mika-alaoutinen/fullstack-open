const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({})
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
    const note = new Note({
        content: request.body.content,
        important: request.body.important || false,
        date: new Date(),
    })

    try {
        const savedNote = await note.save()
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

module.exports = notesRouter