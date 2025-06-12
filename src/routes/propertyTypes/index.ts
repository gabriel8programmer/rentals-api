import { FastifyInstance } from 'fastify'
import { PropertyTypesController } from '../../controllers/PropertyTypesController'

export async function propertyTypesRouter(app: FastifyInstance) {
  const controller = new PropertyTypesController()

  app.get('/', { schema: { tags: ['Property types'] } }, controller.index)
  app.post('/', { schema: { tags: ['Property types'] } }, controller.save)
  app.patch('/:id', { schema: { tags: ['Property types'] } }, controller.update)
  app.delete('/:id', { schema: { tags: ['Property types'] } }, controller.delete)
}
