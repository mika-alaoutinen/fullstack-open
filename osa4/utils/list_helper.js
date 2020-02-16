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

    const authorWithMostBlogs = getLargestMapEntry(authors)
    return {
        author: authorWithMostBlogs[0],
        blogs: authorWithMostBlogs[1]
    }
}

const mostLikes = blogs => {
    const authorsAndLikes = new Map()

    for (const blog of blogs) {
        const currentLikes = authorsAndLikes.has(blog.author)
            ? authorsAndLikes.get(blog.author)
            : 0

        authorsAndLikes.set(blog.author, currentLikes + blog.likes)
    }

    const authorWithMostLikes = getLargestMapEntry(authorsAndLikes)
    return {
        author: authorWithMostLikes[0],
        likes: authorWithMostLikes[1]
    }
}

const totalLikes = blogs =>
    blogs.map(blog => blog.likes)
        .reduce((sum, blogLikes) => sum + blogLikes, 0)

// Returns the map entry with the largest value as an array of [key, value].
const getLargestMapEntry = map =>
    [...map.entries()].reduce((prev, current) => current[1] > prev[1]
        ? current
        : prev)

module.exports = { dummy, favoriteBlog, mostBlogs, mostLikes, totalLikes }