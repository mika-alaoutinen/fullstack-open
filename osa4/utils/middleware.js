const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return throwError(response, 'malformatted id')
    } else if (error.name === 'ValidationError') {
        return throwError(response, error.message)
    }

    next(error)
}

const throwError = (response, message) =>
    response.status(400).send({ error: message })


module.exports = { unknownEndpoint, errorHandler }