import { User } from "."

interface IUser {
    id?: string
    name: string
    email: string
    password?: string
    role?: "ADMIN" | "AGENT" | "CLIENT"
    emailVerified: boolean
}

export class UsersModel {

    create = async (data: IUser)=> {
        return await User.create({data})
    }
}