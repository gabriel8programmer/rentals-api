import { RouteHandler } from "fastify";
import { AuthServices } from "../services/AuthServices";
import { LoginBodySchema, RegisterUserBody, GetEmailOnlySchema, ResetPasswordBodySchema, VerifyEmailBodySchema, RegisterUserResponse } from "../schemas/auth";
import { z } from "zod/v4";

export class AuthController {
    constructor(private readonly authServices: AuthServices) {}

    register: RouteHandler = async (request, reply): Promise<z.infer<typeof RegisterUserResponse>> => {
        const body = RegisterUserBody.parse(request.body)
        const data = await this.authServices.registerUser(body)
        return reply.status(201).send({ data, message: "Warning: Log in to verify your email!" })
    }

    login: RouteHandler = async (request, reply)=> {
        const body = LoginBodySchema.parse(request.body)
        const data = await this.authServices.login(body)

        if (data.status && data.status === "Unverified"){
            return { message: "Email verification required. Please, verify your email inbox to continue!" }
        }

        return { ...data, message: "Logged successfuly!"}
    }

    verify: RouteHandler = async (request, reply)=> {
        const { email, code } = VerifyEmailBodySchema.parse(request.body)
        await this.authServices.verifyEmail(email, code)
        return { message: "Email verified successfuly!"}
    }

    logout: RouteHandler = async (request, reply)=> {
        const { email } = GetEmailOnlySchema.parse(request.body)
        await this.authServices.logout(email)
        return reply.send({message: "Logout successfuly!"})
    }

    refresh: RouteHandler = async (request, reply)=> {
        const { email } = GetEmailOnlySchema.parse(request.body) 
        const clientRefreshToken = request.headers.authorization as string

        const data = await this.authServices.refresh(email, clientRefreshToken)

        return {data, message: "Refreshed authetication tokens!"}       
    }

    forgot: RouteHandler = async (request, reply)=> {
        const { email } = GetEmailOnlySchema.parse(request.body) 
        await this.authServices.forgotPassword(email)
        return { message: "Email sended successfuly!" }
    }

    reset: RouteHandler = async (request, reply)=> {
        const body = ResetPasswordBodySchema.parse(request.body)
        await this.authServices.resetPassword(body)
        return { message: "Password reseted successfuly!" }
    }
}