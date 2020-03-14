require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URL = process.env.DB_URL

if (process.env.NODE_ENV === 'test') {
    MONGODB_URL = process.env.TEST_DB_URL
}

module.exports = { MONGODB_URL, PORT }