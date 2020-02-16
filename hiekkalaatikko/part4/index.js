require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const Note = require('./models/note')

// Middleware:
const app = express()
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(cors())
app.use(bodyParser.json())
// app.use(requestLogger)

// Endpoints:
app.get('/', (request, response) =>
    response.send('<h1>Hello World!</h1>'))

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes.map(note => note.toJSON()))
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => note
            ? response.json(note.toJSON())
            : response.status(404).end())
        .catch(error => next(error))
})

app.post('/api/notes', (request, response, next) => {
    const note = new Note({
        content: request.body.content,
        date: new Date(),
        important: request.body.important || false,
    })

    note.save()
        .then(savedNote => savedNote.toJSON())
        .then(formattedNote => response.json(formattedNote))
        .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
    const note = {
        content: request.body.content,
        important: request.body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => response.json(updatedNote.toJSON()))
        .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then(result => response.status(204).end())
        .catch(error => next(error))
})

// Error handling:
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})