import { FastifyInstance } from 'fastify'
import { PropertyTypesController } from '../../controllers/property-types-controller'
import { ensureIsAdmin, verifyAuthToken } from '../../plugins/auth'
import {
  DeletePropertyTypeOptions,
  SavePropertyTypeOptions,
  ShowPropertyTypesOptions,
  UpdateNamePropertyTypeOptions,
} from './container'
import { PrismaPropertyTypesRepository } from '../../repositories/prisma/property-types-repository'
import { PropertyTypeServices } from '../../services/property-type-services'

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
