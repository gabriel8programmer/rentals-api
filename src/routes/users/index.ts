import { FastifyInstance } from 'fastify'
import { UsersController } from '../../controllers/users-controller'
import { PrismaUsersRepository } from '../../repositories/prisma/users-repository'
import { UserServices } from '../../services/user-services'
import { ensureIsAdmin, verifyAuthToken } from '../../plugins/auth'
import {
  DeleteUserOptions,
  SaveUserOptions,
  ShowSingleUserOptions,
  ShowUsersOptions,
  UpdateUserOptions,
} from './container'

export async function usersRouter(app: FastifyInstance) {
  // get instances
  const repository = new PrismaUsersRepository()
  const services = new UserServices(repository)
  const controller = new UsersController(services)

  app.register(verifyAuthToken)

  app.register(ensureIsAdmin, (app: FastifyInstance) => {
    app.get('/', ShowUsersOptions, controller.index)
    app.post('/', SaveUserOptions, controller.save)
    app.delete('/:id', DeleteUserOptions, controller.delete)
  })

  app.get('/:id', ShowSingleUserOptions, controller.show)
  app.put('/:id', UpdateUserOptions, controller.update)
}
