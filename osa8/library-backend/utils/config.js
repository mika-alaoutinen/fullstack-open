require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URL = process.env.NODE_ENV === 'test'
  ? process.env.TEST_DB_URL
  : process.env.DB_URL

const JWT_SECRET = process.env.SECRET

module.exports = { MONGODB_URL, PORT, JWT_SECRET }