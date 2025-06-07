import { RouteHandler } from "fastify";
import { AuthServices } from "../services/AuthServices";
import { LoginSchema, RegisterUserSchema, GetEmailOnlySchema, ResetPasswordSchema, VerifyEmailSchema } from "../types/schemas/AuthRequestSchemas";

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

            if (data.status && data.status === "Unverified"){
                return { message: "Email verification required. Please, verify your email inbox to continue!" }
            }

            return { data, message: "Logged successfuly!"}
        } catch (error: any) {
            return reply.status(error.status ?? 500).send({message: error.message})
        }   
    }

    verify: RouteHandler = async (request, reply)=> {
        try {
            const { email, code } = VerifyEmailSchema.parse(request.body)

            await this.authServices.verifyEmail(email, code)

            return { message: "Email verified successfuly!"}
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
            const body = ResetPasswordSchema.parse(request.body)
            
            await this.authServices.resetPassword(body)

            return { message: "Password reseted successfuly!" }

        } catch (error: any) {
            return reply.status(error.status ?? 500).send({message: error.message})
        }   
    }
}