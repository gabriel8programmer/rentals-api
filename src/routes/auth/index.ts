
import { UsersModel } from "../../models/User";
import { AuthServices } from "../../services/AuthServices";
import { AuthController } from "../../controllers/AuthController";
import { FastifyTypedInstance } from "../../types/fasfityInstance/types";
import { ForgotPasswordSchema, LoginSchema, LogoutSchema, RefreshSchema, RegisterSchema, ResetPasswordSchema, VerifyEmailSchema } from "./container";

export async function authRouter(app: FastifyTypedInstance) {
    // get instances
    const model = new UsersModel()
    const services = new AuthServices(model)
    const controller = new AuthController(services)

    app.post("/register", { schema: RegisterSchema }, controller.register)
    app.post("/login", { schema: LoginSchema }, controller.login)
    app.post("/verify-email", { schema: VerifyEmailSchema }, controller.verify)
    app.post("/logout", { schema: LogoutSchema }, controller.logout)
    app.post("/refresh", { schema: RefreshSchema }, controller.refresh)
    app.post("/forgot-password", { schema: ForgotPasswordSchema }, controller.forgot)
    app.post("/reset-password", { schema: ResetPasswordSchema }, controller.reset)
}