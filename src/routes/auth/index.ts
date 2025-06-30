import { PrismaUsersRepository } from '../../repositories/prisma/users-repository'
import { AuthServices } from '../../services/auth-services'
import { AuthController } from '../../controllers/auth-controller'
import { FastifyTypedInstance } from '../../types/fastify/types'
import {
  ForgotPasswordOptions,
  LoginOptions,
  LogoutOptions,
  RefreshOptions,
  RegisterOptions,
  ResetPasswordOptions,
  VerifyEmailOptions,
} from './container'

export async function authRouter(app: FastifyTypedInstance) {
  // get instances
  const repository = new PrismaUsersRepository()
  const services = new AuthServices(repository)
  const controller = new AuthController(services)

  app.post('/register', RegisterOptions, controller.register)
  app.post('/login', LoginOptions, controller.login)
  app.post('/verify-email', VerifyEmailOptions, controller.verify)
  app.post('/logout', LogoutOptions, controller.logout)
  app.post('/refresh', RefreshOptions, controller.refresh)
  app.post('/forgot-password', ForgotPasswordOptions, controller.forgot)
  app.post('/reset-password', ResetPasswordOptions, controller.reset)
}
