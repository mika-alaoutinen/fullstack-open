const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const baseUrl = '/api/blogs'

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
        const response = await api.get(baseUrl)
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('blog entry should have an id field', async () => {
        const response = await api.get(baseUrl)
        const blogs = Array.from(response.body)
        blogs.forEach(blog => expect(blog.id).toBeDefined())
    })
})

describe('POST new blog', () => {
    jest.setTimeout(30000)

    test('new blog gets saved correctly', async () => {
        const newBlog = {
            title: 'PHP bad',
            author: 'Mika',
            url: 'blogi.fi/php',
            likes: 12
        }

        const newBlogResponse = await api.post(baseUrl).send(newBlog)
        expect(newBlogResponse.status).toBe(201)
        expect(newBlogResponse.type).toBe('application/json')

        const blogResponse = newBlogResponse.body
        delete blogResponse.id
        expect(blogResponse).toEqual(newBlog)

        const blogs = await helper.blogsInDb()
        expect(blogs.length).toBe(helper.initialBlogs.length + 1)
    })

    test('default value for likes is 0', async () => {
        const newBlog = {
            title: 'PHP bad',
            author: 'Mika',
            url: 'blogi.fi/php',
        }

        const newBlogResponse = await api.post(baseUrl).send(newBlog)
        expect(newBlogResponse.status).toBe(201)
        expect(newBlogResponse.type).toBe('application/json')

        const blog = newBlogResponse.body
        expect(blog.likes).toBe(0)
    })

    test('new blog contains title and url', async () => {
        const invalidBlog = {
            author: 'Mika',
            likes: 1,
        }

        const response = await api.post(baseUrl).send(invalidBlog)
        expect(response.status).toBe(400)
    })
})

describe('DELETE blog', () => {
    jest.setTimeout(30000)

    test('blog is deleted and returns 204 status code', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api.delete(baseUrl + '/' + blogToDelete.id)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('UPDATE blog', () => {
    jest.setTimeout(30000)

    test('blog can be edited', async () => {
        const blog = {
            title: 'Java for dummies',
            author: 'Mika',
            url: 'blogi.fi/java',
            likes: 1
        }

        const blogsAtStart = await helper.blogsInDb()
        const blogToEdit = blogsAtStart[0]

        const editedBlogResponse = await api.put(baseUrl + '/' + blogToEdit.id)
            .send(blog)
            .expect(200)

        const editedBlog = editedBlogResponse.body
        delete editedBlog.id
        expect(editedBlog).toEqual(blog)
    })
})

afterAll(async () => {
    // Avoid jest open handle error:
    await new Promise(resolve => setTimeout(() => resolve(), 500))
    mongoose.disconnect()
})