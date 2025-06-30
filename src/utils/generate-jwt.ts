import { EnvSchema } from '../schemas/env'
import jwt from 'jsonwebtoken'

const { JWT_SECRET_KEY } = EnvSchema.parse(process.env)

export const generateDefaultJwt = async (
  payload: { id: string },
  jwtKey: string = JWT_SECRET_KEY || 'jwt_secret_key',
  expiresIn: any = '1d',
): Promise<string> => {
  return await jwt.sign(payload, jwtKey, { expiresIn })
}

export const verifyJwtToken = async (
  token: string,
  jwtKey: string = JWT_SECRET_KEY || 'jwt_secret_key',
): Promise<string | jwt.JwtPayload> => {
  return await jwt.verify(token, jwtKey)
}
