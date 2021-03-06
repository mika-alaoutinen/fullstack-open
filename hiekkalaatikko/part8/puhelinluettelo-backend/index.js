const { ApolloServer, gql, AuthenticationError, UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Person = require('./models/person')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://fullstack:sekred@cluster0-ostce.mongodb.net/graphql?retryWrites=true'
console.log('connecting to', MONGODB_URI)

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connection to MongoDB:', error.message))

const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String! 
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addPerson(name: String! phone: String street: String! city: String!): Person
    editNumber(name: String! phone: String!): Person
    createUser(username: String!): User
    login(username: String! password: String!): Token
    addAsFriend(name: String!): User
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }
`

const resolvers = {
  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({ ...args })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        await person.save()  
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      return person
    },
    
    addAsFriend: async (root, args, { currentUser }) => {
      const nonFriendAlready = person =>
        !currentUser.friends
          .map(f => f._id)
          .includes(person._id)

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const person = await Person.findOne({ name: args.name })
      if (nonFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person)
      }

      await currentUser.save()
      return currentUser
    },

    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      person.phone = args.phone
      try {
        return await person.save()  
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, { invalidArgs: args })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      const token = jwt.sign(userForToken, JWT_SECRET)

      return { value: token }
    },
  },
  
  Query: {
    personCount: () => Person.collection.countDocuments(),

    allPersons: (root, args) => args.phone
      ? Person.find({ phone: { $exists: args.phone === 'YES' } })
      : Person.find({}),

    findPerson: (root, args) => Person.findOne({ name: args.name }),

    me: (root, args, context) => context.currentUser,
  },

  Person: {
    address: root => ({
      street: root.street,
      city: root.city,
    })
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User
        .findById(decodedToken.id)
        .populate('friends')

      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})