import { FastifyInstance } from 'fastify'
import { PropertiesController } from '../../controllers/properties-controller'
import { PrismaPropertiesRepository } from '../../repositories/prisma/properties-repository'
import { PropertyServices } from '../../services/property-services'

export async function propertiesRouter(app: FastifyInstance) {
  // get instances
  const model = new PrismaPropertiesRepository()
  const service = new PropertyServices(model)
  const controller = new PropertiesController(service)

  app.get('/', { schema: { tags: ['Properties'] } }, controller.index)
  app.get('/:id', { schema: { tags: ['Properties'] } }, controller.show)
  app.post('/', { schema: { tags: ['Properties'] } }, controller.save)
  app.put('/:id', { schema: { tags: ['Properties'] } }, controller.update)
  app.delete('/:id', { schema: { tags: ['Properties'] } }, controller.delete)

  app.get('/:id/images', { schema: { tags: ['Properties'] } }, controller.images)
  app.post('/:id/images', { schema: { tags: ['Properties'] } }, controller.addImage)
  app.delete('/:id/images/:imageId', { schema: { tags: ['Properties'] } }, controller.removeImage)
}
