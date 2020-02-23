const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1, id: 1 })

    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const user = await User.findById(body.userId)
    const blog = createBlog(body, user._id)

    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog)
        await user.save()
        response.status(201)
        response.json(savedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
    }

    try {
        const editedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(editedBlog)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

// Utility functions:
const createBlog = (body, userId) => {
    return new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: userId,
    })
}

module.exports = blogsRouter