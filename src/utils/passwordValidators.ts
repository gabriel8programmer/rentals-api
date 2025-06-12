
import bcrypt from "bcrypt" 

export const encryptPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10)
}

export const validatePassword = async (password: string, hashedPassword: string): Promise<Boolean> => {
    return await bcrypt.compare(password, hashedPassword)
}