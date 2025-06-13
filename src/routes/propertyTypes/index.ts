import { FastifyInstance } from 'fastify'
import { PropertyTypesController } from '../../controllers/PropertyTypesController'
import { ensureIsAdmin, verifyAuthToken } from '../../plugins/auth'
import {
  DeletePropertyTypeOptions,
  SavePropertyTypeOptions,
  ShowPropertyTypesOptions,
  UpdateNamePropertyTypeOptions,
} from './container'
import { PrismaPropertyTypesRepository } from '../../repositories/prisma/PrismaPropertyTypesRepository'
import { PropertyTypeServices } from '../../services/PropertyTypeServices'

export async function propertyTypesRouter(app: FastifyInstance) {
  //get instances
  const repository = new PrismaPropertyTypesRepository()
  const services = new PropertyTypeServices(repository)
  const controller = new PropertyTypesController(services)

  app.register(verifyAuthToken)
  app.register(ensureIsAdmin)

  app.get('/', ShowPropertyTypesOptions, controller.index)
  app.post('/', SavePropertyTypeOptions, controller.save)
  app.patch('/:id', UpdateNamePropertyTypeOptions, controller.update)
  app.delete('/:id', DeletePropertyTypeOptions, controller.delete)
}
