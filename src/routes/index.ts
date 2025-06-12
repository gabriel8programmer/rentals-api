import { FastifyInstance } from 'fastify'

// routers
import { authRouter } from './auth'
import { usersRouter } from './users'
import { propertiesRouter } from './properties'
import { propertyTypesRouter } from './propertyTypes'

export async function routes(app: FastifyInstance) {
  // register all routes here
  app.register(authRouter, { prefix: '/auth' })
  app.register(usersRouter, { prefix: '/users' })
  app.register(propertiesRouter, { prefix: '/properties' })
  app.register(propertyTypesRouter, { prefix: '/property-types' })
}
