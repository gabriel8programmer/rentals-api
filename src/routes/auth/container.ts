import { ForgotPasswordBodySchema, ForgotPasswordResponseSchema, LoginBodySchema, LoginResponseSchema, LogoutBodySchema, LogoutResponseSchema, RefreshBodySchema, RefreshResponseSchema, RegisterUserBody, RegisterUserResponseSchema, ResetPasswordBodySchema, VerifyEmailBodySchema, VerifyEmailResponseSchema } from "../../schemas/auth"
import { setErrorResponses } from "../../schemas/errors"

//set error responses
const RegisterErrorReponses = setErrorResponses(400, 500)
const LoginErrorResponses = setErrorResponses(400, 401, 404, 500)
const VerifyEmailErrorResponses = setErrorResponses(400, 404, 500)
const LogoutErrorReponses = setErrorResponses(400, 404, 500)
const RefreshErrorResponses = setErrorResponses(400, 401, 404, 500)
const ForgotPasswordErrorResponses = setErrorResponses(400, 404, 500)
const ResetPasswordErrorResponses = setErrorResponses(400, 401, 404, 500)

export const RegisterSchema = {
    description: "Register a new user with client role",
    tags: ["Auth"],
    body: RegisterUserBody,
    response: {
        201: RegisterUserResponseSchema,
        ...RegisterErrorReponses
    }
}

export const LoginSchema = {
    description: "Log in with email and password",
    tags: ["Auth"],
    body: LoginBodySchema,
    response: {
        200: LoginResponseSchema,
        ...LoginErrorResponses
    }
}

export const VerifyEmailSchema = {
    description: "Verify email with Code",
    tags: ["Auth"],
    body: VerifyEmailBodySchema,
    response: {
        200: VerifyEmailResponseSchema,
        ...VerifyEmailErrorResponses
    }
}

export const LogoutSchema = {
    description: "Logout passing email",
    tags: ["Auth"],
    body: LogoutBodySchema,
    response: {
        200: LogoutResponseSchema,
        ...LogoutErrorReponses
    }
}

export const RefreshSchema =  {
    description: "Get new accessToken and refreshToken too",
    tags: ["Auth"],
    body: RefreshBodySchema,
    response: {
        200: RefreshResponseSchema,
        ...RefreshErrorResponses
    }
}

export const ForgotPasswordSchema = {
    description: "Forgot password",
    tags: ["Auth"],
    body: ForgotPasswordBodySchema,
    response: {
        200: ForgotPasswordResponseSchema,
        ...ForgotPasswordErrorResponses
    }
}

export const ResetPasswordSchema = {
    description: "Reset password",
    tags: ["Auth"],
    body: ResetPasswordBodySchema,
    response: {
        200: RefreshResponseSchema,
        ...ResetPasswordErrorResponses
    }
}