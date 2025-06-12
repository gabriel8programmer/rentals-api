import { RouteHandlerMethod } from "fastify";
import { UserServices } from "../services/UserServices";
import { SaveUserBodySchema, UpdateUserBodySchema, UserRequestParamsSchema } from "../schemas/users";

export class UsersController {
    constructor (private readonly userServices: UserServices) {}

    index: RouteHandlerMethod = async (request, reply)=> {
        const users = await this.userServices.getAllUsers()
        return users
    }

    show: RouteHandlerMethod = async (request, reply)=> {
        const { id } = UserRequestParamsSchema.parse(request.params)
        const user = await this.userServices.getUserById(id)
        return user
    }

    save: RouteHandlerMethod = async (request, reply)=> {
        const body = SaveUserBodySchema.parse(request.body)
        const data = await this.userServices.createUser(body)
        return reply.status(201).send({message: "User create successfuly!", data })
    }

    update: RouteHandlerMethod = async (request, reply)=> {
        const { id } = UserRequestParamsSchema.parse(request.params)
        const body = UpdateUserBodySchema.parse(request.body)
        const data = await this.userServices.updateUserById(id, body)
        return { message: "User udpated successfuly!", data }
    }

    delete: RouteHandlerMethod = async (request, reply)=> {
        const { id } = UserRequestParamsSchema.parse(request.params)
        await this.userServices.deleteUserById(id)
        return { message: "User deleted successfuly!"}        
    }
}