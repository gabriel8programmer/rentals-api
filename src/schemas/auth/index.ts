import { z } from "zod/v4";
import { DefaultErrorResponseSchema } from "../errors";

export const RegisterUserBody = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string()
})

export const RegisterUserResponse = z.object({
    message: z.string().default("Warning: Log in to verify your email!"),
    data: z.object({
        name: z.string(),
        email: z.string(),
        role: z.enum(["ADMIN", "AGENT", "CLIENT"]),
        emailVerified: z.boolean(),
        socialLogged: z.boolean(),
        createdAt: z.date(),
        updatedAt: z.date()
    })
}).describe("User Created!")

export const LoginBodySchema = RegisterUserBody.pick({email: true, password: true})

export const GetEmailOnlySchema = z.object({email: z.email() })

export const LogoutBodySchema = GetEmailOnlySchema
export const RefreshBodySchema = GetEmailOnlySchema
export const ForgotPasswordBodySchema = GetEmailOnlySchema

export const ResetPasswordBodySchema = z.object({
    email: z.string(),
    newPassword: z.string(),
    code: z.string()
})

export const VerifyEmailBodySchema = ResetPasswordBodySchema.pick({email: true, code: true})