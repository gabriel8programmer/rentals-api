import { RouteHandlerMethod } from 'fastify'
import { AuthServices } from '../services/AuthServices'
import {
  LoginBodySchema,
  RegisterUserBody,
  GetEmailOnlySchema,
  ResetPasswordBodySchema,
  VerifyEmailBodySchema,
} from '../schemas/auth'

export class AuthController {
  constructor(private readonly authServices: AuthServices) {}

  register: RouteHandlerMethod = async (request, reply) => {
    const body = RegisterUserBody.parse(request.body)
    const data = await this.authServices.registerUser(body)
    return reply.status(201).send({ data, message: 'Warning: Log in to verify your email!' })
  }

  login: RouteHandlerMethod = async (request, reply) => {
    const body = LoginBodySchema.parse(request.body)
    const data = await this.authServices.login(body)

    if (data.status && data.status === 'Unverified') {
      return {
        message: 'Email verification required. Please, verify your email inbox to continue!',
      }
    }

    return { ...data, message: 'Logged successfuly!' }
  }

  verify: RouteHandlerMethod = async (request, reply) => {
    const { email, code } = VerifyEmailBodySchema.parse(request.body)
    await this.authServices.verifyEmail(email, code)
    return { message: 'Email verified successfuly!' }
  }

  logout: RouteHandlerMethod = async (request, reply) => {
    const { email } = GetEmailOnlySchema.parse(request.body)
    await this.authServices.logout(email)
    return { message: 'Logout successfuly!' }
  }

  refresh: RouteHandlerMethod = async (request, reply) => {
    const { email } = GetEmailOnlySchema.parse(request.body)
    const clientRefreshToken = request.headers.authorization as string

    const data = await this.authServices.refresh(email, clientRefreshToken)

    return { data, message: 'Authentication tokens updated!' }
  }

  forgot: RouteHandlerMethod = async (request, reply) => {
    const { email } = GetEmailOnlySchema.parse(request.body)
    await this.authServices.forgotPassword(email)
    return { message: 'Email sended successfuly!' }
  }

  reset: RouteHandlerMethod = async (request, reply) => {
    const body = ResetPasswordBodySchema.parse(request.body)
    await this.authServices.resetPassword(body)
    return { message: 'Password reseted successfuly!' }
  }
}
