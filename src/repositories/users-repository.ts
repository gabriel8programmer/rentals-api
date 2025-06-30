import { User } from '@prisma/client'

export interface ICreateUserParams {
  name: string
  email: string
  // optional params
  password?: string
  role?: 'ADMIN' | 'AGENT' | 'CLIENT'
  emailVerified?: boolean
  socialLogged?: boolean
}

export interface IUsersRepository {
  find: () => Promise<User[]>
  findById: (id: string) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
  create: (params: ICreateUserParams) => Promise<User>
  updateById: (id: string, params: Partial<ICreateUserParams>) => Promise<User | null>
  deleteById: (id: string) => Promise<void>
}
