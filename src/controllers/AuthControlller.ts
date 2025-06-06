import { RouteHandler } from "fastify";
import { AuthServices } from "../services/AuthServices";
import { LoginSchema, RegisterUserSchema, GetEmailOnlySchema } from "../types/schemas/AuthRequestSchemas";

export class AuthController {
    constructor(private readonly authServices: AuthServices) {}

    register: RouteHandler = async (request, reply)=> {
        try {
            const body = RegisterUserSchema.parse(request.body)
            const data = await this.authServices.registerUser(body)
            return reply.status(201).send({ data, message: "Warning: Log in to verify your email!" })
        } catch (error: any) {
            return reply.status(error.status ?? 500).send({message: error.message})
        }   
    }

    login: RouteHandler = async (request, reply)=> {
        try {
            const body = LoginSchema.parse(request.body)
            const data = await this.authServices.login(body)
            return { data, message: "Logged successfuly!"}
        } catch (error: any) {
            return reply.status(error.status ?? 500).send({message: error.message})
        }   
    }

    logout: RouteHandler = async (request, reply)=> {
        try {
            const { email } = GetEmailOnlySchema.parse(request.body)
            await this.authServices.logout(email)
            return reply.send({message: "Logout successfuly!"})
        } catch (error: any) {
            return reply.status(error.status ?? 500).send({message: error.message})
        }   
    }

    refresh: RouteHandler = async (request, reply)=> {
        try {
            const { email } = GetEmailOnlySchema.parse(request.body) 
            const clientRefreshToken = request.headers.authorization as string

            const data = await this.authServices.refresh(email, clientRefreshToken)

            return {data, message: "Refreshed authetication tokens!"}

        } catch (error: any) {
            return reply.status(error.status ?? 500).send({message: error.message})
        }   
    }

    forgot: RouteHandler = async (request, reply)=> {
        try {
            const { email } = GetEmailOnlySchema.parse(request.body) 

            await this.authServices.forgotPassword(email)

            return { message: "Email sended successfuly!" }

        } catch (error: any) {
            return reply.status(error.status ?? 500).send({message: error.message})
        }   
    }

    reset: RouteHandler = async (request, reply)=> {
        try {
            
        } catch (error: any) {
            return reply.status(error.status ?? 500).send({message: error.message})
        }   
    }
}