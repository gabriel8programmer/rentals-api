
import { UsersModel } from "../../models/User";
import { AuthServices } from "../../services/AuthServices";
import { AuthController } from "../../controllers/AuthController";
import { FastifyTypedInstance } from "../../types/fasfityInstance/types";

export async function authRouter(app: FastifyTypedInstance) {
    // get instances
    const model = new UsersModel()
    const services = new AuthServices(model)
    const controller = new AuthController(services)

    app.post("/register", { schema: {tags: ["Auth"] } }, controller.register)
    app.post("/login", { schema: {tags: ["Auth"]} }, controller.login)
    app.post("/verify-email", { schema: {tags: ["Auth"]} }, controller.verify)
    app.post("/logout", { schema: {tags: ["Auth"]} }, controller.logout)
    app.post("/refresh", { schema: {tags: ["Auth"]} }, controller.refresh)
    app.post("/forgot-password", { schema: {tags: ["Auth"]} }, controller.forgot)
    app.post("/reset-password", { schema: {tags: ["Auth"]} }, controller.reset)
}