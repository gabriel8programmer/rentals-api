import { ForgotPasswordBodySchema, ForgotPasswordResponseSchema, LoginBodySchema, LoginResponseSchema, LogoutBodySchema, LogoutResponseSchema, RefreshBodySchema, RefreshResponseSchema, RegisterUserBody, RegisterUserResponseSchema, ResetPasswordBodySchema, ResetPasswordResponseSchema, VerifyEmailBodySchema, VerifyEmailResponseSchema } from "../../schemas/auth"
import { setErrorResponses } from "../../schemas/errors"
import { RouteShorthandOptions } from "fastify"

//set error responses
const RegisterErrorReponses = setErrorResponses(400, 500)
const LoginErrorResponses = setErrorResponses(400, 401, 404, 500)
const VerifyEmailErrorResponses = setErrorResponses(400, 404, 500)
const LogoutErrorReponses = setErrorResponses(400, 404, 500)
const RefreshErrorResponses = setErrorResponses(400, 401, 404, 500)
const ForgotPasswordErrorResponses = setErrorResponses(400, 404, 500)
const ResetPasswordErrorResponses = setErrorResponses(400, 401, 404, 500)

export const RegisterOptions: RouteShorthandOptions = {
    schema: {
        description: "Register a new user with client role",
        tags: ["Auth"],
        body: RegisterUserBody,
        response: {
            201: RegisterUserResponseSchema,
            ...RegisterErrorReponses
        }
    }
}

export const LoginOptions: RouteShorthandOptions = {
    schema: {
        description: "Log in with email and password",
        tags: ["Auth"],
        body: LoginBodySchema,
        response: {
            200: LoginResponseSchema,
            ...LoginErrorResponses
        }
    }
}

export const VerifyEmailOptions: RouteShorthandOptions = {
    schema: {
        description: "Verify email with Code",
        tags: ["Auth"],
        body: VerifyEmailBodySchema,
        response: {
            200: VerifyEmailResponseSchema,
            ...VerifyEmailErrorResponses
        }
    }
}

export const LogoutOptions: RouteShorthandOptions = {
    schema: {
        description: "Logout passing email",
        tags: ["Auth"],
        body: LogoutBodySchema,
        response: {
            200: LogoutResponseSchema,
            ...LogoutErrorReponses
        }
    }
}

export const RefreshOptions: RouteShorthandOptions =  {
    schema: {
        description: "Get new accessToken and refreshToken too",
        tags: ["Auth"],
        body: RefreshBodySchema,
        response: {
            200: RefreshResponseSchema,
            ...RefreshErrorResponses
        },
        security: [{ refreshAuth: [] }]
    }
}

export const ForgotPasswordOptions: RouteShorthandOptions = {
   schema: {
    description: "Forgot password",
    tags: ["Auth"],
    body: ForgotPasswordBodySchema,
    response: {
        200: ForgotPasswordResponseSchema,
        ...ForgotPasswordErrorResponses
    }
   }
}

export const ResetPasswordOptions: RouteShorthandOptions = {
    schema: {
        description: "Reset password",
        tags: ["Auth"],
        body: ResetPasswordBodySchema,
        response: {
            200: ResetPasswordResponseSchema,
            ...ResetPasswordErrorResponses
        }
    }
}