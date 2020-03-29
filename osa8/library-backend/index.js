const config = require('./utils/config')
const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server')
const { resolvers } = require('./graphql/resolvers')
const { typeDefs } = require('./graphql/typeDefs')
const { authenticate } = require('./services/userService')

mongoose.set('useFindAndModify', false)

console.log('connecting to', config.MONGODB_URL)
mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => authenticate(req)
})

server.listen()
  .then(({ url }) => console.log(`Server ready at ${url}`))