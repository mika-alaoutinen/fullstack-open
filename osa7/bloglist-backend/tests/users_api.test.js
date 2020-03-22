const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const baseUrl = '/api/users'

beforeEach(async () => {
    await User.deleteMany({})

    for (const user of helper.initialUsers) {
        const userObject = new User(user)
        await userObject.save()
    }
})

describe('validate username on new user creation', () => {
    jest.setTimeout(30000)

    test('username is not undefined', async () => {
        const user = createUser(undefined, 'Mika Alaoutinen', 'admin')
        const response = await api.post(baseUrl).send(user)
        expectError(response, 'User validation failed: username: Path `username` is required.')
    })

    test('username is at least three characters long', async () => {
        const user = createUser('ad', 'Mika Alaoutinen', 'admin')
        const response = await api.post(baseUrl).send(user)
        expectError(response, 'is shorter than the minimum allowed length (3)')
    })

    test('username is unique', async () => {
        const user = createUser('admin', 'Pekka Kana', 'admin')
        const response = await api.post(baseUrl).send(user)
        expectError(response, 'expected `username` to be unique.')
    })
})

describe('validate password on new user creation', () => {
    jest.setTimeout(30000)

    test('password is not undefined', async () => {
        const user = createUser('admin', 'Mika Alaoutinen', undefined)
        const response = await api.post(baseUrl).send(user)
        expectError(response, 'missing password')
    })

    test('password is at least 3 characters long', async () => {
        const user = createUser('admin', 'Mika Alaoutinen', 'ad')
        const response = await api.post(baseUrl).send(user)
        expectError(response, 'password must be at least 3 characters long')
    })
})

afterAll(async () => {
    // Avoid jest open handle error:
    await new Promise(resolve => setTimeout(() => resolve(), 500))
    mongoose.disconnect()
})

// Utility functions:
const createUser = (username, name, password) => ({
    username: username,
    name: name,
    password: password,
})

const expectError = (response, text) => {
    expect(response.status).toBe(400)
    expect(response.text).toContain(text)
}