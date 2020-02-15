const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://mika-alaoutinen:${password}@free-cluster-1-p0rae.mongodb.net/note-app?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'CSS is Easy',
    date: new Date(),
    important: true,
})

// note.save().then(response => {
//     console.log('note saved!');
//     console.log(`result: ${response}`);
//     mongoose.connection.close();
// })

Note.find({ important: true }).then(result => {
    result.forEach(note => console.log(note))
    mongoose.connection.close()
})