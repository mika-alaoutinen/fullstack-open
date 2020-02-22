const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (const blog of helper.initialBlogs) {
        const blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('GET blogs', () => {
    jest.setTimeout(30000)

    test('correct amount of blogs is returned as json', async () => {
        const response = await api.get('/api/blogs')
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test.only('blog entry should have an id field', async () => {
        const response = await api.get('/api/blogs')
        const blogs = Array.from(response.body)
        blogs.forEach(blog => expect(blog.id).toBeDefined())
    })
})

afterAll(async () => {
    // Avoid jest open handle error:
    await new Promise(resolve => setTimeout(() => resolve(), 500))
    mongoose.disconnect()
})