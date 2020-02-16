const dummy = blogs => {
    console.log(blogs)
    return 1
}

const favoriteBlog = blogs =>
    blogs.reduce((prev, current) => prev.likes > current.likes
        ? prev
        : current)

const totalLikes = blogs =>
    blogs.map(blog => blog.likes)
        .reduce((sum, blogLikes) => sum + blogLikes, 0)

module.exports = { dummy, favoriteBlog, totalLikes }