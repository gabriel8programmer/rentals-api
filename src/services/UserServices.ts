import { HttpError } from "../errors/HttpError";
import { PrismaUsersRepository } from "../repositories/prisma/PrismaUsersRepository";
import { ICreateUserParams } from "../repositories/UsersRepository";
import { encryptPassword } from "../utils/passwordValidators";

export class UserServices {
    constructor(private readonly usersRepository: PrismaUsersRepository) {}

    private validateUserById = async (id: string)=> {
        const user = await this.usersRepository.findById(id)

        if (!user) throw new HttpError(404, "User not found!")

        return user
    }

    getAllUsers = async ()=> {
        return this.usersRepository.find()
    }

    createUser = async (params: Omit<ICreateUserParams, "socialLogin">)=> {
        const { password: currentPassword } = params
        const password = await encryptPassword(currentPassword as string)
        return await this.usersRepository.create({...params, password})
    }

    getUserById = async (id: string) => {
        return this.validateUserById(id)
    }

    updateUserById = async (id: string, params: Partial<Omit<ICreateUserParams, "socialLogged">>) => {
        await this.validateUserById(id)

        const { password: rawPassword, email, emailVerified} = params

        let data = {}

        // validate email
        if (email && !emailVerified) data = {emailVerified: false}

        // update password
        if (rawPassword) {
            const password = await encryptPassword(rawPassword)
            data = { ...data, password }
        }

        Object.assign(params, {...data})

        const userUpdated = await this.usersRepository.updateById(id, params) 
        return userUpdated
    }

    deleteUserById = async (id: string)=> {
        await this.validateUserById(id)
        await this.usersRepository.deleteById(id)
    }
}