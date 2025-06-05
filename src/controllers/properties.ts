import { RouteHandler } from "fastify";
import { PropertiesModel } from "../models/properties";
import { z } from "zod";

const CreatePropertySchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    price: z.number(),
    size: z.number().optional(),
    bedrooms: z.number().optional(),
    bathrooms: z.number().optional(),
    parkingSpaces: z.number().optional(),
    status: z.enum(["Available", "Rented", "Under_maintenance"]).optional(),
    location: z.object({
        city: z.string().optional(),
        state: z.string().optional(),
        locality: z.string().optional(),
        country: z.string().optional(),
        street: z.string().optional(),
        addressNumber: z.string().optional(),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        location: z.string().optional(),
        postalCode: z.string().optional(),
    }).optional(),
    propertyTypeId: z.string()
})

const UpdatePropertySchema = CreatePropertySchema.partial()

const RouteParamsSchema = z.object({
    id: z.string(),
    imageId: z.string().optional()
})

const AddImageSchema = z.object({
    url: z.string(),
    cover: z.boolean().default(false)
})

export class PropertiesController {
    private model
    constructor(){
        this.model = new PropertiesModel()
    }

    index: RouteHandler = async (request, reply) => {
        try {
            const data = await this.model.find()
            return reply.send({data})
        } catch (error: any) {
            return reply.status(500).send({message: error.message})
        }
    }

    show: RouteHandler = async (request, reply) => {
        try {
            const { id } = RouteParamsSchema.parse(request.params)
            const property = await this.model.findById(id)

            //validate property id
            if (!property) return reply.status(404).send({message: "Property not found!"})

            return reply.send({data: property})
        } catch (error: any) {
            return reply.status(500).send({message: error.message})
        }
    }

    save: RouteHandler = async (request, reply) => {
        try {
            const body = CreatePropertySchema.parse(request.body)
            const newProperty = await this.model.create(body)
            return reply.status(201).send({data: newProperty})
        } catch (error: any) {
            return reply.status(500).send({message: error.message})
        }
    }

    update: RouteHandler = async (request, reply) => {
        try {
            const { id } = RouteParamsSchema.parse(request.params)
            const body = UpdatePropertySchema.parse(request.body)
            const updatedProperty = await this.model.update(id, body)

            //validate property id
            if (!updatedProperty) return reply.status(404).send({message: "Property not found!"})

            return reply.send({data: updatedProperty})
        } catch (error: any) {
            return reply.status(500).send({message: error.message})
        }
    }

    delete: RouteHandler = async (request, reply) => {
        try {
            const { id } = RouteParamsSchema.parse(request.params)
            const deletedProperty = await this.model.delete(id)

            //validate property id
            if (!deletedProperty) return reply.status(404).send({message: "Property not found!"})

            return reply.send({message: "Property deleted successfuly!"})
        } catch (error: any) {
            return reply.status(500).send({message: error.message})
        }
    }

    images: RouteHandler = async (request, reply)=> {
        try {
            const { id } = RouteParamsSchema.parse(request.params)
            const property = await this.model.findById(id)

            //validate property id
            if (!property) return reply.status(404).send({message: "Property not found!"})

            return await this.model.findImages(id)
            
        } catch (error: any) {
            return reply.status(500).send({message: error.message})
        }
    }

    addImage: RouteHandler = async (request, reply)=> {
        try {
            const { id } = RouteParamsSchema.parse(request.params)
            const data = AddImageSchema.parse(request.body)

            const property = await this.model.findById(id)

            //validate property id
            if (!property) return reply.status(404).send({message: "Property not found!"})

            await this.model.createImage(id, data)

            return reply.status(201).send()

        } catch (error: any) {
            return reply.status(500).send({message: error.message})
        }
    }

    removeImage: RouteHandler = async (request, reply)=> {
        try {
            const { id, imageId } = RouteParamsSchema.parse(request.params)

            const property = await this.model.findById(id)
            const propertyImage = await this.model.findImageById(id, imageId as string)

            //validate property id
            if (!property) return reply.status(404).send({message: "Property not found!"})

            //validate property image id
            if (!propertyImage) return reply.status(404).send({message: "Image not found!"})

            await this.model.deleteImage(id, imageId as string)

            return reply.status(204).send()
            
        } catch (error: any) {
            return reply.status(500).send({message: error.message})
        }
    }

}