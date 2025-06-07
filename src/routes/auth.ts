
import { FastifyInstance } from "fastify";
import { UsersModel } from "../models/User";
import { AuthServices } from "../services/AuthServices";
import { AuthController } from "../controllers/AuthControlller";

export default async function router(app: FastifyInstance) {
    // get instances
    const model = new UsersModel()
    const services = new AuthServices(model)
    const controller = new AuthController(services)

    app.post("/register", controller.register)
    app.post("/login", controller.login)
    app.post("/verify-email", controller.verify)
    app.post("/logout", controller.logout)
    app.post("/refresh", controller.refresh)
    app.post("/forgot-password", controller.forgot)
    app.post("/reset-password", controller.reset)
}