
import { FastifyInstance } from "fastify";
import { UsersController } from "../../controllers/UsersController";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { UserServices } from "../../services/UserServices";

export async function usersRouter(app: FastifyInstance) {
    // get instances
    const repository = new PrismaUsersRepository()
    const services = new UserServices(repository)
    const controller = new UsersController(services)

    app.get("/", {schema: {tags: ["Users"]} }, controller.index)
    app.get("/:id", {schema: {tags: ["Users"]} }, controller.show)
    app.post("/", {schema: {tags: ["Users"]} }, controller.save)
    app.put("/:id", {schema: {tags: ["Users"]} }, controller.update)
    app.delete("/:id", {schema: {tags: ["Users"]} }, controller.delete)
}