import { FastifyInstance } from 'fastify'

export async function ErrorsHandlerPlugin(app: FastifyInstance) {
  app.setErrorHandler(async (error, request, reply) => {
    const statusCode = error.statusCode ? error.statusCode : 500

    if (reply.sent) return

    return reply.status(statusCode).send({
      message: statusCode === 500 ? 'There was a internal server error!' : error.message,
      error: error.name,
      statusCode: error.statusCode,
    })
  })
}
