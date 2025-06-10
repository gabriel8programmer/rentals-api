
import { FastifyInstance } from "fastify";
import { UsersController } from "../../controllers/UsersController";

export async function usersRouter(app: FastifyInstance) {
    // get instances
    const controller = new UsersController()

    app.get("/users", {schema: {tags: ["Users"]} }, controller.index)
    app.get("/users/:id", {schema: {tags: ["Users"]} }, controller.show)
    app.post("/users", {schema: {tags: ["Users"]} }, controller.save)
    app.put("/users/:id", {schema: {tags: ["Users"]} }, controller.update)
    app.delete("/users/:id", {schema: {tags: ["Users"]} }, controller.delete)
}