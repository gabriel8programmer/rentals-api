
import { UsersModel } from "../../models/User";
import { AuthServices } from "../../services/AuthServices";
import { AuthController } from "../../controllers/AuthController";
import { FastifyTypedInstance } from "../../types/fasfityInstance/types";
import { ForgotPasswordBodySchema, LoginBodySchema, LogoutBodySchema, RefreshBodySchema, RegisterUserBody, RegisterUserResponse, ResetPasswordBodySchema, VerifyEmailBodySchema } from "../../schemas/auth";
import { z } from "zod/v4";
import { DefaultErrorResponseSchema } from "../../schemas/errors";

export async function authRouter(app: FastifyTypedInstance) {
    // get instances
    const model = new UsersModel()
    const services = new AuthServices(model)
    const controller = new AuthController(services)

    //document register route
    app.post("/register", { 
        schema: {
            description: "Register a new user with client role",
            tags: ["Auth"],
            body: RegisterUserBody
        } 
    }, controller.register)

    //document login route
    app.post("/login", {
        schema: {
            description: "Todo login with email and password",
            tags: ["Auth"],
            body: LoginBodySchema
        }
    }, controller.login)

    //document verify email route
    app.post("/verify-email", { 
        schema: {
            description: "Verify email with Code",
            tags: ["Auth"],
            body: VerifyEmailBodySchema
        } 
    }, controller.verify)

    //document logout route
    app.post("/logout", {
        schema: {
            description: "Todo Logout with email",
            tags: ["Auth"],
            body: LogoutBodySchema
        }
    }, controller.logout)

    //document refresh route
    app.post("/refresh", {
        schema: {
            description: "Get new accessToken and refreshToken too",
            tags: ["Auth"],
            body: RefreshBodySchema
        }
    }, controller.refresh)

    //document forgot password route
    app.post("/forgot-password", {
        schema: {
            description: "Forgot password",
            tags: ["Auth"],
            body: ForgotPasswordBodySchema
        }
    }, controller.forgot)

    //document reset password route
    app.post("/reset-password", {
         schema: {
            description: "Reset password",
            tags: ["Auth"],
            body: ResetPasswordBodySchema
        }
    }, controller.reset)
}