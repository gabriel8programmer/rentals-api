
import { FastifyInstance } from "fastify";
import { UsersController } from "../../controllers/UsersController";

export async function usersRouter(app: FastifyInstance) {
    // get instances
    const controller = new UsersController()

    app.get("/users", controller.index)
    app.get("/users/:id", controller.show)
    app.post("/users", controller.save)
    app.put("/users/:id", controller.update)
    app.delete("/users/:id", controller.delete)
}