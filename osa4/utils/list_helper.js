const dummy = blogs => {
    console.log(blogs)
    return 1
}

const favoriteBlog = blogs =>
    blogs.reduce((prev, current) => prev.likes > current.likes
        ? prev
        : current)

const mostBlogs = blogs => {
    const authors = new Map()

    for (const blog of blogs) {
        const blogCount = authors.get(blog.author) || 0
        authors.set(blog.author, blogCount + 1)
    }

    const authorWithMostBlogs = [...authors.entries()]
        .reduce((prev, current) => current[1] > prev[1]
            ? current
            : prev)

    return {
        author: authorWithMostBlogs[0],
        blogs: authorWithMostBlogs[1]
    }
}

const totalLikes = blogs =>
    blogs.map(blog => blog.likes)
        .reduce((sum, blogLikes) => sum + blogLikes, 0)

module.exports = { dummy, favoriteBlog, mostBlogs, totalLikes }