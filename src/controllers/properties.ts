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

const GetIdSchema = z.object({
    id: z.string()
})

export class PropertiesController {
    private model
    constructor(){
        this.model = new PropertiesModel()
    }

    index: RouteHandler = async (request, reply) => {
        try {
            const data = await this.model.find()
            reply.send({data})
        } catch (error: any) {
            reply.status(500).send({message: error.message})
        }
    }

    show: RouteHandler = async (request, reply) => {
        try {
            const { id } = GetIdSchema.parse(request.params)
            const property = await this.model.findById(id)

            //validate property id
            if (!property) return reply.status(404).send({message: "Property not found!"})

            reply.send({data: property})
        } catch (error: any) {
            reply.status(500).send({message: error.message})
        }
    }

    save: RouteHandler = async (request, reply) => {
        try {
            const body = CreatePropertySchema.parse(request.body)
            const newProperty = await this.model.create(body)
            reply.status(201).send({data: newProperty})
        } catch (error: any) {
            reply.status(500).send({message: error.message})
        }
    }

    update: RouteHandler = async (request, reply) => {
        try {
            const { id } = GetIdSchema.parse(request.params)
            const body = UpdatePropertySchema.parse(request.body)
            const updatedProperty = await this.model.update(id, body)
            reply.send({data: updatedProperty})
        } catch (error: any) {
            reply.status(500).send({message: error.message})
        }
    }

    delete: RouteHandler = async (request, reply) => {
        try {
            const { id } = GetIdSchema.parse(request.params)
            await this.model.delete(id)
            reply.send({message: "Property deleted successfuly!"})
        } catch (error: any) {
            reply.status(500).send({message: error.message})
        }
    }
}