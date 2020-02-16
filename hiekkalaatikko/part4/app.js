const bodyParser = require('body-parser')
const config = require('./utils/config')
const cors = require('cors')
const express = require('express')
const app = express()
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const notesRouter = require('./controllers/notes')

logger.info('connecting to', config.MONGODB_URL)
mongoose.set('useFindAndModify', false)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true })
    .then(() => logger.info('connected to MongoDB'))
    .catch((error) => logger.error('error connection to MongoDB:', error.message))

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app