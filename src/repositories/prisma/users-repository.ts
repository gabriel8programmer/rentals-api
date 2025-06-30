import { User } from '@prisma/client'
import { ICreateUserParams, IUsersRepository } from '../users-repository'
import { prisma } from '../../config/prisma'

export class PrismaUsersRepository implements IUsersRepository {
  find = async (): Promise<User[]> => {
    return await prisma.user.findMany()
  }

  findById = async (id: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { id } })
  }

  findByEmail = async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { email } })
  }

  create = async (data: ICreateUserParams): Promise<User> => {
    return await prisma.user.create({ data })
  }

  updateById = async (id: string, data: Partial<ICreateUserParams>): Promise<User | null> => {
    return await prisma.user.update({ where: { id }, data })
  }

  deleteById = async (id: string): Promise<void> => {
    await prisma.user.delete({ where: { id } })
  }
}
