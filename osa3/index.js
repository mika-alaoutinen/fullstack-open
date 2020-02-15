require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
// const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

// Middleware:
app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postdata'))
// morgan.token('postdata', (req, res) => JSON.stringify(req.body))

// REST endpoints:
app.get('/info', (request, response) => {
    Person.find({})
        .then(people => postInfo(people, response))
})

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(people => response.json(people.map(person => person.toJSON())))
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => person
            ? response.json(person.toJSON())
            : response.status(404).end())
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    // Validate request content:
    if (!body.name) {
        return throwError(response, 'name is missing')
    }
    if (!body.number) {
        return throwError(response, 'number is missing')
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
        .then(savedPerson => response.json(savedPerson.toJSON()))
})

app.put('/api/persons/:id', (request, response, next) => {
    const person = {
        name: request.body.name,
        number: request.body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => response.json(updatedPerson.toJSON()))
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => response.status(204).end())
        .catch(error => next(error))
})

// Error handling:
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return throwError(response, 'malformatted id')
    }

    next(error)
}

app.use(errorHandler)

// Utility functions:
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const throwError = (response, text) =>
    response.status(400).json({error: text})

const postInfo = (people, response) => {
    const numPeople = people.length;
    const today = new Date();

    response.send(
        `<p>Phonebook has info for ${numPeople} people</p>
        ${today}`
    )
}