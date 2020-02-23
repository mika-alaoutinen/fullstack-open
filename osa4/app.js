const config = require('./utils/config')
const middleware = require('./utils/middleware')

const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

// Connect to database:
console.log('connecting to', config.MONGODB_URL)
mongoose.set('useFindAndModify', false)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true })
    .then(() => console.log('connected to MongoDB'))
    .catch((error) => console.log('error connection to MongoDB:', error.message))

// Middleware:
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)

// Routers:
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

// Exception handling:
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app