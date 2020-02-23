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

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization !== undefined) {
        request.token = authorization && authorization.toLowerCase().startsWith('bearer ')
            ? authorization.substring(7)
            : null
    }

    next()
}

module.exports = {
    unknownEndpoint, errorHandler, throwError, tokenExtractor
}