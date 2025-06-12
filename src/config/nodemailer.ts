import "dotenv/config"
import { createTransport } from "nodemailer"
import { EnvSchema } from "../schemas/env"

const env = EnvSchema.parse(process.env)

const transportOptions = {
    host: env.NODEMAILER_HOST,
    port: env.NODEMAILER_PORT,
    secure: false,
    auth: {
        user: env.NODEMAILER_USER,
        pass: env.NODEMAILER_PASS
    }
}

const transporter = createTransport(transportOptions)

export interface ISendEmailOptions {
    from: string
    to: string
    subject?: string
    text?: string
    html?: string
} 

export const sendEmail = async (sendEmailOptions: ISendEmailOptions)=> {
    try {
        return await transporter.sendMail(sendEmailOptions)

    } catch (error) {
        throw new Error("Error to send email!")
    }
}

export default transporter 