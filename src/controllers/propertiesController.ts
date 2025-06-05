import { RouteHandler } from "fastify";
import { AddImageSchema, CreatePropertySchema, RouteParamsSchema, UpdatePropertySchema } from "../types/schemas/propertyRequestSchemas";
import { PropertyServices } from "../services/propertyServices";

export class PropertiesController {
    constructor(private readonly propertyServices: PropertyServices){}

    index: RouteHandler = async (request, reply) => {
        try {
            const data = await this.propertyServices.getAllProperties()
            return reply.send({data})
        } catch (error: any) {
            return reply.status(error.status ?? 500).send({message: error.message})
        }
    }

    show: RouteHandler = async (request, reply) => {
        try {
            const { id } = RouteParamsSchema.parse(request.params)
            const property = await this.propertyServices.getPropertyById(id)
            return reply.send({data: property})
        } catch (error: any) {
            return reply.status(error.status ?? 500).send({message: error.message})
        }
    }

    save: RouteHandler = async (request, reply) => {
        try {
            const body = CreatePropertySchema.parse(request.body)
            const newProperty = await this.propertyServices.createProperty(body)
            return reply.status(201).send({data: newProperty})
        } catch (error: any) {
            return reply.status(error.status ?? 500).send({message: error.message})
        }
    }

    update: RouteHandler = async (request, reply) => {
        try {
            const { id } = RouteParamsSchema.parse(request.params)
            const body = UpdatePropertySchema.parse(request.body)
            const updatedProperty = await this.propertyServices.udpatePropertyById(id, body)
            return reply.send({data: updatedProperty})
        } catch (error: any) {
            return reply.status(error.status ?? 500).send({message: error.message})
        }
    }

    delete: RouteHandler = async (request, reply) => {
        try {
            const { id } = RouteParamsSchema.parse(request.params)
            await this.propertyServices.deletePropertyById(id)
            return reply.send({message: "Property deleted successfuly!"})
        } catch (error: any) {
            return reply.status(error.status ?? 500).send({message: error.message})
        }
    }

    images: RouteHandler = async (request, reply)=> {
        try {
            const { id } = RouteParamsSchema.parse(request.params)
            const images = await this.propertyServices.getImagesFromProperty(id)
            return images
        } catch (error: any) {
            return reply.status(error.status ?? 500).send({message: error.message})
        }
    }

    addImage: RouteHandler = async (request, reply)=> {
        try {
            const { id } = RouteParamsSchema.parse(request.params)
            const data = AddImageSchema.parse(request.body)
            await this.propertyServices.addImageFromProperty(id, data)
            return reply.status(201).send()
        } catch (error: any) {
            return reply.status(error.status ?? 500).send({message: error.message})
        }
    }

    removeImage: RouteHandler = async (request, reply)=> {
        try {
            const { id, imageId } = RouteParamsSchema.parse(request.params)
            await this.propertyServices.removeImageByIdFromProperty(id, imageId as string)
            return reply.status(204).send()
        } catch (error: any) {
            return reply.status(error.status ?? 500).send({message: error.message})
        }
    }

}