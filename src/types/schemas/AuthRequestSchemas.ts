import { z } from "zod";

export const RegisterUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

export const LoginSchema = RegisterUserSchema.pick({email: true, password: true})

export const GetEmailOnlySchema = z.object({email: z.string().email() })

export const ResetPasswordSchema = z.object({
    email: z.string(),
    newPassword: z.string(),
    code: z.string()
})

export const VerifyEmailSchema = ResetPasswordSchema.pick({email: true, code: true})