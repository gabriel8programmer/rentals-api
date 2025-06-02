import { RouteHandler } from "fastify";

export class PropertiesController {
    index: RouteHandler = async (request, reply) => {
        reply.send({message: "Hello properties!"})
    }

    show: RouteHandler = async (request, reply) => {

    }

    save: RouteHandler = async (request, reply) => {
        
    }

    update: RouteHandler = async (request, reply) => {
        
    }

    delete: RouteHandler = async (request, reply) => {
        
    }
}