const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
// const morgan = require('morgan')

// Middleware:
app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postdata'))
// morgan.token('postdata', (req, res) => JSON.stringify(req.body))

// "Database":
let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    },
]

// REST endpoints:
app.get('/info', (request, response) => {
    const numPeople = persons.length;
    const today = new Date();

    response.send(
        `<p>Phonebook has info for ${numPeople} people</p>
        ${today}`
    )
})

app.get('/api/persons', (request, response) =>
    response.json(persons))

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    person ? response.json(person) : response.status(404).end()
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
    if (persons.some(person => person.name === body.name)) {
        return throwError(response, 'name must be unique')
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * Math.floor(100)),
    }

    persons = persons.concat(person)
    response.json(person)
})

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