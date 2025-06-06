import { RouteHandler } from "fastify";

export class UsersController {
    index: RouteHandler = async (request, reply)=> {
        try {
            
        } catch (error: any) {
            return reply.status(500).send({message: error.message})
        }
    }

    show: RouteHandler = async (request, reply)=> {
        try {
            
        } catch (error: any) {
            return reply.status(500).send({message: error.message})
        }
    }

    save: RouteHandler = async (request, reply)=> {
        try {
            
        } catch (error: any) {
            return reply.status(500).send({message: error.message})
        }
    }

    update: RouteHandler = async (request, reply)=> {
        try {
            
        } catch (error: any) {
            return reply.status(500).send({message: error.message})
        }
    }

    delete: RouteHandler = async (request, reply)=> {
        try {
            
        } catch (error: any) {
            return reply.status(500).send({message: error.message})
        }
    }
}