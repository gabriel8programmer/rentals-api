import { HttpError } from "../errors/HttpError";
import { UsersModel } from "../models/User";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { envSchema } from "../types/env";
import { User } from "@prisma/client";
import { deleteRedisAsync, existsRedisAsync, getRedisAsync, setRedisAsync, ttlRedisAsync } from "../config/redis";
import { v4 as uuidv4 } from "uuid"
import { ISendEmailOptions, sendEmail } from "../config/nodemailer";
import { getFormatedEmailTemplate } from "../utils/emails";

const env = envSchema.parse(process.env)

export class AuthServices {
    constructor (private readonly usersModel: UsersModel) {}

    private _jwt_secret_key = env.JWT_SECRET_KEY ?? "jwt_secret_key"

    private generateDefaultJwt = async (payload: {id: string}, jwtKey: string = this._jwt_secret_key, expiresIn: any = "1d"): Promise<string> => {
        return await jwt.sign(payload, jwtKey, { expiresIn })
    }

    private validateUserByEmail = async (email: string): Promise<User> => {
        const user = await this.usersModel.findByEmail(email)

        if (!user) throw new HttpError(404, "User not found!")

        return user
    }

    registerUser = async (params: {name: string, email: string, password: string})=> {
        // get password in params
        const { password: rawPassword } = params

        // encrypt password
        const password = await bcrypt.hash(rawPassword, 10)

        const user = await this.usersModel.create({...params, password})
        const userData: Omit<User, "password"> = user
        return {data: userData}
    }

    login = async (params: {email: string, password: string}) => {
        const { password: rawPassword, email } = params

        const user = await this.usersModel.findByEmail(email)
        const verifyPassword = await bcrypt.compare(rawPassword, user?.password as string)

        if (!user || !verifyPassword) throw new HttpError(401, "Invalid Login!")

        // generate new default jwt token
        const payload = { id: user.id }
        const accessToken = await this.generateDefaultJwt(payload)

        // generate refresh token with uuid v4
        const refreshToken = uuidv4()

        // save accesstoken and refresh token in the redis
        await setRedisAsync(`access-token-${user.id}`, accessToken, 86400)
        await setRedisAsync(`refresh-token-${user.id}`, refreshToken, 2592000)

        const userData: Omit<User, "password"> = user 

        return { data: userData, accessToken, refreshToken}
    }

    logout = async (email: string)=> {
        const {id} = await this.validateUserByEmail(email)

        // remove tokens from redis
        await deleteRedisAsync(`access-token-${id}`)
        await deleteRedisAsync(`refresh-token-${id}`)
    }

    refresh = async (email: string, clientRefreshToken: string) => {
        const {id} = await this.validateUserByEmail(email)

        if (!clientRefreshToken) throw new HttpError(401, "Token is required!")

        const parsedToken = await clientRefreshToken.split(" ")[1]
       
        // test if tokens exists
        const currentRefreshToken = await getRedisAsync(`refresh-token-${id}`)
        const refreshTokenExists = await existsRedisAsync(`refresh-token-${id}`)

        if (!refreshTokenExists || currentRefreshToken !== parsedToken) throw new HttpError(401, "Token invalid or expired!")

        // generate new accesstoken and regenerate refresh token too
        const accessToken = await this.generateDefaultJwt({id})
        const refreshToken = uuidv4()

        // update redis tokens
        await setRedisAsync(`access-token-${id}`, accessToken, 86400)
        await setRedisAsync(`refresh-token-${id}`, refreshToken, 2592000)

        return { accessToken, refreshToken }
    }

    forgotPassword = async (email: string)=> {
        const { id } = await this.validateUserByEmail(email)

        // generate verification code
        const code = String(Math.floor(Math.random() * 10000)).padStart(4, "0")

        // create template with code
        const html = getFormatedEmailTemplate(code)

        // get current code in redis
        const currentCodes = await getRedisAsync(`code-${id}`)
        const newCodes: string[] = currentCodes ? JSON.parse(currentCodes): []
        
        // add code in redis with default max time of 10 min and in max 3 codes generated
        if (newCodes.length >= 3) throw new HttpError(401, "Max number of email checks reached (3)!")

        newCodes.push(code)

        await setRedisAsync(`code-${id}`, JSON.stringify(newCodes))
        
        // create send email options object
        const sendEmailOptions: ISendEmailOptions = {
            from: env.NODEMAILER_USER as string, 
            to: email,
            subject: "Verificação de email",
            html: html
        }

        // send email
        return await sendEmail(sendEmailOptions)
    }

    resetPassword = async (params: {email: string, newPassword: string, code: string})=> {
        const { email, newPassword, code } = params

        const { id, password: currentPassword } = await this.validateUserByEmail(email)
        const currentPasswordDecrypted = await bcrypt.compare(newPassword, currentPassword as string)

        if (currentPasswordDecrypted) throw new HttpError(401, "The current password cannot be the same as the old one!")

        // get current code in redis
        const currentCodes = await getRedisAsync(`code-${id}`)
        const newCodes: string[] = currentCodes ? JSON.parse(currentCodes): []

        // validate if newCodes is empty
        if (newCodes.length <= 0) throw new HttpError(400, "There is not any code verification saved!")
        // validate if code exists in newCodes
        if (!newCodes.includes(code)) throw new HttpError(400, "Invalid or expired code!")

        
        // encrypt new password
        const password = await bcrypt.hash(newPassword, 10)

        // delete code verified
        await deleteRedisAsync(`code-${id}`)

        // udpate password
        await this.usersModel.updateById(id, { password })
    }
}