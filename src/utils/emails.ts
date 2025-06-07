
import fs from "node:fs"
import path from "node:path"

const emailFilePath = path.resolve("src", "templates", "emails", "verify-email.html")

export const htmlTemplate = fs.readFileSync(emailFilePath, {  encoding: "utf-8" })

export const getFormatedEmailTemplate = (code: string) => {
    return htmlTemplate.replace("{{CODE}}", code)
}
