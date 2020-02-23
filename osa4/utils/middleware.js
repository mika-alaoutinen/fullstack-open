const unknownEndpoint = (request, response) => {
    return throwError(response, 404, 'unknown endpoint')
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return throwError(response, 400, 'malformatted id')
    } else if (error.name === 'ValidationError') {
        return throwError(response, 400, error.message)
    } else if (error.name === 'JsonWebTokenError') {
        return throwError(response, 401, 'invalid token')
    }

    next(error)
}

const throwError = (response, statusCode, message) =>
    response.status(statusCode).send({ error: message })

module.exports = { unknownEndpoint, errorHandler, throwError }