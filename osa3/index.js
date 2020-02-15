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
        .then(person => response.json(person.toJSON()))
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

// TODO: fix
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

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