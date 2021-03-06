const mongoose = require('mongoose')
const url = process.env.DB_URL

mongoose.set('useFindAndModify', false)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(url, { useNewUrlParser: true })
    .then(result => console.log("connected to MongoDB"))
    .catch(error => console.log("error connecting to MongoDB:", error.message))

// Schema
const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minlength: 5,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
})

module.exports = mongoose.model('Note', noteSchema)