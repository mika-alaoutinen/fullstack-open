const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1, id: 1 })

    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const user = await validateAndGetUser(request, response, next)
    if (user === undefined) {
        return
    }

    try {
        const blog = createBlog(request.body, user._id)
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog)
        await user.save()

        response.status(201)
        response.json(savedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
    try {
        const blog = await Blog
            .findById(request.params.id)
            .populate('user', { username: 1, name: 1, id: 1 })

        blog.comments = blog.comments.concat(request.body.comment)
        const savedBlog = await blog.save()

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
        const editedBlog = await Blog
            .findByIdAndUpdate(request.params.id, blog, { new: true })
            .populate('user', { username: 1, name: 1, id: 1 })

        response.json(editedBlog)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const user = await validateAndGetUser(request, response, next)
    if (user === undefined) {
        return
    }

    try {
        const blog = await Blog.findById(request.params.id)

        if (blog.user.toString() === user.id.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        }
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

const validateAndGetUser = async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        return await User.findById(decodedToken.id)
    } catch (error) {
        next(error)
    }
}

module.exports = blogsRouter