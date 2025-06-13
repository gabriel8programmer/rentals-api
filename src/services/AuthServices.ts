import { HttpError } from '../errors/HttpError'
import { PrismaUsersRepository } from '../repositories/prisma/PrismaUsersRepository'
import { EnvSchema } from '../schemas/env'
import { User } from '@prisma/client'
import { deleteRedisAsync, existsRedisAsync, getRedisAsync, setRedisAsync } from '../config/redis'
import { v4 as uuidv4 } from 'uuid'
import { ISendEmailOptions, sendEmail } from '../config/nodemailer'
import { getFormatedEmailTemplate } from '../utils/emails'
import { encryptPassword, validatePassword } from '../utils/passwordValidators'
import { generateDefaultJwt } from '../utils/generateJwtToken'

const env = EnvSchema.parse(process.env)

export class AuthServices {
  constructor(private readonly usersModel: PrismaUsersRepository) {}

  private validateUserByEmail = async (email: string): Promise<User> => {
    const user = await this.usersModel.findByEmail(email)

    if (!user) throw new HttpError(404, 'User not found!')

    return user
  }

  private sendEmailVerificationCodeByUserId = async (id: string, email: string) => {
    // generate verification code
    const code = String(Math.floor(Math.random() * 10000)).padStart(4, '0')

    // create template with code
    const html = getFormatedEmailTemplate(code)

    // get current code in redis
    const currentCodes = await getRedisAsync(`code-${id}`)
    const newCodes: string[] = currentCodes ? JSON.parse(currentCodes) : []

    // add code in redis with default max time of 10 min and in max 3 codes generated
    if (newCodes.length >= 3) throw new HttpError(401, 'Max number of email checks reached (3)!')

    newCodes.push(code)

    await setRedisAsync(`code-${id}`, JSON.stringify(newCodes))

    // create send email options object
    const sendEmailOptions: ISendEmailOptions = {
      from: env.NODEMAILER_USER as string,
      to: email,
      subject: 'Verificação de email',
      html: html,
    }

    // send email
    return await sendEmail(sendEmailOptions)
  }

  private validateVerificationCodeByUserId = async (id: string, code: string) => {
    // get current code in redis
    const currentCodes = await getRedisAsync(`code-${id}`)
    const newCodes: string[] = currentCodes ? JSON.parse(currentCodes) : []

    // validate if newCodes is empty
    if (newCodes.length <= 0) throw new HttpError(400, 'There is not any code verification saved!')

    // validate if code exists in newCodes
    if (!newCodes.includes(code)) throw new HttpError(400, 'Invalid or expired code!')
  }

  registerUser = async (params: { name: string; email: string; password: string }) => {
    // get password in params
    const { password: rawPassword } = params

    // encrypt password
    const password = await encryptPassword(rawPassword)

    const user = await this.usersModel.create({ ...params, password })
    const userData: Omit<User, 'password'> = user
    return userData
  }

  login = async (params: { email: string; password: string }) => {
    const { password: rawPassword, email } = params

    //validate user
    const user = await this.validateUserByEmail(email)

    // verify password
    const verifyEmail = await validatePassword(rawPassword, user.password as string)
    if (!verifyEmail) throw new HttpError(401, 'Invalid Email or password!')

    // verify email if user email verified is equals false
    if (!user.emailVerified) {
      const dataEmail = await this.sendEmailVerificationCodeByUserId(user.id, email)
      return { data: dataEmail, status: 'Unverified' }
    }

    // generate new default jwt token
    const payload = { id: user.id }
    const accessToken = await generateDefaultJwt(payload)

    // generate refresh token with uuid v4
    const refreshToken = uuidv4()

    // save accesstoken and refresh token in the redis
    await setRedisAsync(`access-token-${user.id}`, accessToken, 86400)
    await setRedisAsync(`refresh-token-${user.id}`, refreshToken, 2592000)

    const userData: Omit<User, 'password'> = user

    return { data: userData, accessToken, refreshToken }
  }

  verifyEmail = async (email: string, code: string) => {
    //validate user
    const { id } = await this.validateUserByEmail(email)

    // verify code
    await this.validateVerificationCodeByUserId(id, code)

    //update verified email for true
    await this.usersModel.updateById(id, { emailVerified: true })
  }

  logout = async (email: string) => {
    //validate user
    const { id } = await this.validateUserByEmail(email)

    // remove tokens from redis
    await deleteRedisAsync(`access-token-${id}`)
    await deleteRedisAsync(`refresh-token-${id}`)
  }

  refresh = async (email: string, clientRefreshToken: string) => {
    //validate user
    const { id, socialLogged, emailVerified } = await this.validateUserByEmail(email)

    if (!clientRefreshToken) throw new HttpError(401, 'Token is required!')

    const parsedToken = await clientRefreshToken.split(' ')[1]

    // test if tokens exists
    const currentRefreshToken = await getRedisAsync(`refresh-token-${id}`)
    const refreshTokenExists = await existsRedisAsync(`refresh-token-${id}`)

    if (!refreshTokenExists || currentRefreshToken !== parsedToken)
      throw new HttpError(401, 'Token invalid or expired!')

    // generate new accesstoken and regenerate refresh token too
    const accessToken = await generateDefaultJwt({ id })
    const refreshToken = uuidv4()

    // update redis tokens
    await setRedisAsync(`access-token-${id}`, accessToken, 86400)
    await setRedisAsync(`refresh-token-${id}`, refreshToken, 2592000)

    return { accessToken, refreshToken }
  }

  forgotPassword = async (email: string) => {
    //validate user
    const { id, socialLogged, emailVerified } = await this.validateUserByEmail(email)
    return await this.sendEmailVerificationCodeByUserId(id, email)
  }

  resetPassword = async (params: { email: string; newPassword: string; code: string }) => {
    const { email, newPassword, code } = params

    //validate user
    const {
      id,
      password: currentPassword,
      socialLogged,
      emailVerified,
    } = await this.validateUserByEmail(email)
    const currentPasswordDecrypted = await validatePassword(newPassword, currentPassword as string)

    // verify code
    await this.validateVerificationCodeByUserId(id, code)

    // test if old password and new password are the same
    if (currentPasswordDecrypted)
      throw new HttpError(401, 'The current password cannot be the same as the old one!')

    // encrypt new password
    const password = await encryptPassword(newPassword)

    // delete code verified
    await deleteRedisAsync(`code-${id}`)

    // udpate password
    await this.usersModel.updateById(id, { password })
  }
}
