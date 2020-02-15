const mongoose = require('mongoose')

// Connect to MongoDB:
if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://mika-alaoutinen:${password}@free-cluster-1-p0rae.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true })

// Schemas:
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

// Models:
const Person = mongoose.model('Person', personSchema)

// Functions:
const getPeople = () =>
    Person.find({}).then(people => {
        console.log('phonebook:')
        people.forEach(person => console.log(person.name + ' ' + person.number))
        mongoose.connection.close()
    })

const addPerson = (name, number) => {
    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(savedPerson => {
        console.log(`added: ${savedPerson.name} ${savedPerson.number}`)
        mongoose.connection.close()
    })
}

// Main application logic:
if (process.argv.length === 3) {
    getPeople()
} else if (process.argv.length === 5) {
    addPerson(process.argv[3], process.argv[4])
} else {
    console.log(`Wrong number of arguments: ${process.argv.length}. Give 3 or 5 arguments.`)
}