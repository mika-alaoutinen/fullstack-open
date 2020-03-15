const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'php for potatoes',
        author: 'Mika',
        url: 'blogi.fi/php',
        likes: 1
    },
    {
        title: 'Kuningas Java',
        author: 'Pekka',
        url: 'blogi.fi/Java',
        likes: 101
    },
    {
        title: 'JavaScript bad',
        author: 'Hugo',
        url: 'blogi.fi/js',
        likes: 20
    }
]

const initialUsers = [
    {
        blogs: [],
        username: 'admin',
        name: 'Mika Alaoutinen',
        passwordHash: '$2b$10$4ciUHVKznMvuYTiGNwqzQ.OBHREmPQcvUM2nsdlD.t3kWt04C7le.',
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, initialUsers, blogsInDb, usersInDb
}