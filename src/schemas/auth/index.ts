import { z } from 'zod/v4'

export const RegisterUserBody = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
})

export const UserDataSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(['ADMIN', 'AGENT', 'CLIENT']),
  emailVerified: z.boolean(),
  socialLogged: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const LoginBodySchema = RegisterUserBody.pick({ email: true, password: true })

export const GetEmailOnlySchema = z.object({ email: z.email() })

export const LogoutBodySchema = GetEmailOnlySchema
export const RefreshBodySchema = GetEmailOnlySchema
export const ForgotPasswordBodySchema = GetEmailOnlySchema

export const ResetPasswordBodySchema = z.object({
  email: z.string(),
  newPassword: z.string(),
  code: z.string(),
})

export const VerifyEmailBodySchema = ResetPasswordBodySchema.pick({ email: true, code: true })

// responses

export const DefaultResponseSchema = z
  .object({
    message: z.string(),
  })
  .describe('OK!')

export const RegisterUserResponseSchema = z
  .object({
    message: z.string(),
    data: UserDataSchema,
  })
  .describe('Created!')

export const LoginResponseSchema = z
  .object({
    message: z.string(),
    data: UserDataSchema.optional(),
    accessToken: z.string().optional(),
    refreshToken: z.string().optional(),
  })
  .describe('OK!')

export const RefreshResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
})

export const VerifyEmailResponseSchema = DefaultResponseSchema
export const LogoutResponseSchema = DefaultResponseSchema
export const ForgotPasswordResponseSchema = DefaultResponseSchema
export const ResetPasswordResponseSchema = DefaultResponseSchema
