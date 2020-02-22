const Blog = require('../models/blog')

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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }