import { RouteHandler } from "fastify";
import { PropertiesModel } from "../models/properties";
import { z } from "zod";

const CreatePropertySchema = z.object({

})

export class PropertiesController {
    private model
    constructor(){
        this.model = new PropertiesModel()
    }

    index: RouteHandler = async (request, reply) => {
        const data = await this.model.find()
        reply.send({data})
    }

    show: RouteHandler = async (request, reply) => {
        const { id } = request
        const data = await this.model.findById(id)
        reply.send({data})
    }

    save: RouteHandler = async (request, reply) => {
        
    }

    update: RouteHandler = async (request, reply) => {
        
    }

    delete: RouteHandler = async (request, reply) => {
        
    }
}