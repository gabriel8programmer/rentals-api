import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import { HttpError } from '../../errors/http-error'
import { verifyJwtToken } from '../../utils/generate-jwt'
import { PrismaUsersRepository } from '../../repositories/prisma/users-repository'

export const verifyAuthToken = fp(async function (app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    //instance users repository
    const usersRepository = new PrismaUsersRepository()

    const authToken = request.headers.authorization

    if (!authToken || !authToken.startsWith('Bearer '))
      throw new HttpError(401, 'Invalid token format')

    if (!authToken) throw new HttpError(401, 'Token is required!')

    const token = authToken.split(' ')[1]

    const payload = await verifyJwtToken(token)

    if (typeof payload !== 'string') {
      const { id } = payload
      const user = await usersRepository.findById(id)

      if (!user) throw new HttpError(404, 'User not found!')

      request.user = user
    }
  })
})

export const ensureIsAdmin = fp(async function (app: FastifyInstance) {
  app.addHook('preHandler', (request, reply, done) => {
    const { user } = request

    if (user?.role !== 'ADMIN')
      throw new HttpError(401, 'Access denied. Administrator permissions are required.')

    done()
  })
})
