import { RouteHandlerMethod } from 'fastify'
import { prisma } from '../config/prisma'
import { z } from 'zod'
import { HttpError } from '../errors/http-error'
import { PropertyTypeServices } from '../services/property-type-services'

const SaveTypeSchema = z.object({ name: z.string() })
const RouteParamsSchema = z.object({ id: z.string() })

export class PropertyTypesController {
  constructor(private readonly propertyTypeServices: PropertyTypeServices) {}

  index: RouteHandlerMethod = async (request, reply) => {
    return this.propertyTypeServices.getAll()
  }

  save: RouteHandlerMethod = async (request, reply) => {
    const data = SaveTypeSchema.parse(request.body)
    await this.propertyTypeServices.create(data)
    return reply.status(201).send()
  }

  update: RouteHandlerMethod = async (request, reply) => {
    const { id } = RouteParamsSchema.parse(request.params)
    const data = SaveTypeSchema.parse(request.body)
    const updatedPropertyType = await this.propertyTypeServices.update(id, data)

    if (!updatedPropertyType) throw new HttpError(404, 'Property type not found!')

    return reply.status(204).send()
  }

  delete: RouteHandlerMethod = async (request, reply) => {
    const { id } = RouteParamsSchema.parse(request.params)
    await this.propertyTypeServices.delete(id)
    return reply.status(204).send()
  }
}
