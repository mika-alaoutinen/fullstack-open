const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
    Note.find({})
        .then(notes => notes.map(note => note.toJSON()))
        .then(notes => response.json(notes))
})

notesRouter.get('/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => note
            ? response.json(note.toJSON())
            : response.status(404).end())
        .catch(error => next(error))
})

notesRouter.post('/', (request, response, next) => {
    const note = new Note({
        content: request.body.content,
        important: request.body.important || false,
        date: new Date(),
    })

    note.save()
        .then(note => note.toJSON())
        .then(note => response.json(note))
        .catch(error => next(error))
})

notesRouter.delete('/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then(() => response.status(204).end())
        .catch(error => next(error))
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