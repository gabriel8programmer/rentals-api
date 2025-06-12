import { RouteHandlerMethod } from "fastify";
import { AddImageSchema, CreatePropertySchema, RouteParamsSchema, UpdatePropertySchema } from "../schemas/properties";
import { PropertyServices } from "../services/PropertyServices";

export class PropertiesController {
    constructor(private readonly propertyServices: PropertyServices){}

    index: RouteHandlerMethod = async (request, reply) => {
        const data = await this.propertyServices.getAllProperties()
        return reply.send({data})
    }

    show: RouteHandlerMethod = async (request, reply) => {
        const { id } = RouteParamsSchema.parse(request.params)
        const property = await this.propertyServices.getPropertyById(id)
        return reply.send({data: property})
    }

    save: RouteHandlerMethod = async (request, reply) => {        
        const body = CreatePropertySchema.parse(request.body)
        const newProperty = await this.propertyServices.createProperty(body)
        return reply.status(201).send({data: newProperty})
    }

    update: RouteHandlerMethod = async (request, reply) => {
        const { id } = RouteParamsSchema.parse(request.params)
        const body = UpdatePropertySchema.parse(request.body)
        const updatedProperty = await this.propertyServices.udpatePropertyById(id, body)
        return reply.send({data: updatedProperty})
    }

    delete: RouteHandlerMethod = async (request, reply) => {
        const { id } = RouteParamsSchema.parse(request.params)
        await this.propertyServices.deletePropertyById(id)
        return reply.send({message: "Property deleted successfuly!"})
    }

    images: RouteHandlerMethod = async (request, reply)=> {
        const { id } = RouteParamsSchema.parse(request.params)
        const images = await this.propertyServices.getImagesFromProperty(id)
        return images
    }

    addImage: RouteHandlerMethod = async (request, reply)=> {
        const { id } = RouteParamsSchema.parse(request.params)
        const data = AddImageSchema.parse(request.body)
        await this.propertyServices.addImageFromProperty(id, data)
        return reply.status(201).send()
    }

    removeImage: RouteHandlerMethod = async (request, reply)=> {
        const { id, imageId } = RouteParamsSchema.parse(request.params)
        await this.propertyServices.removeImageByIdFromProperty(id, imageId as string)
        return reply.status(204).send()
    }
}