import { ErrorRequestHandler } from 'express'

interface ServerError extends Error {
	status?: number
	message: string
}

export const errorHandler: ErrorRequestHandler = (error: ServerError, request, response, _next) => {
	if (error) {
		console.log(`error ${error.message}`)
		const status = error.status || 401
		response.status(status).send(error.message)
	}
}
