
import { FastifyInstance } from "fastify";
import { UsersController } from "../../controllers/UsersController";

export async function usersRouter(app: FastifyInstance) {
    // get instances
    const controller = new UsersController()

    app.get("/", {schema: {tags: ["Users"]} }, controller.index)
    app.get("/:id", {schema: {tags: ["Users"]} }, controller.show)
    app.post("/", {schema: {tags: ["Users"]} }, controller.save)
    app.put("/:id", {schema: {tags: ["Users"]} }, controller.update)
    app.delete("/:id", {schema: {tags: ["Users"]} }, controller.delete)
}