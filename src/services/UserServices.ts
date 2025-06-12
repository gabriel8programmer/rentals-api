import { HttpError } from "../errors/HttpError";
import { UsersModel } from "../repositories/prisma/PrismaUsersRepository";
import { ICreateUserParams } from "../repositories/UsersRepository";
import bcrypt from "bcrypt"

export class UserServices {
    constructor(private readonly usersModel: UsersModel) {}

    getAllUsers = async ()=> {

    }

    createUser = async (params: ICreateUserParams)=> {
        const { password: currentPassword } = params

        const password = await bcrypt.hash(currentPassword as string, 10)

        return await this.usersModel.create({...params, password})
    }

    getUserById = async (id: string) => {
        const user = await this.usersModel.findById(id)

        if (!user) throw new HttpError(404, "User not found!")

        return user
    }

    updateUserById = async (id: string, params: Partial<Omit<ICreateUserParams, "role" | "socialLogin">>) => {
        const user = await this.getUserById(id)
    }

    deleteUserById = async (id: string)=> {
        const user = await this.getUserById(id)
    }
}