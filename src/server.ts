
import "dotenv/config"
import Fastify from "fastify";
import { sequelize } from "./config/database";
import { envSchema } from "./types/env";
import "./models"

import {propertiesRoutes} from "./routes/properties"

const app = Fastify({logger: true})

const port = envSchema.parse(process.env).PORT
const host = "0.0.0.0"

sequelize.sync({force: true}).then(()=> {
    console.log("Sync database!")
}).catch(error => {
    console.log(error.message)
})

app.register(propertiesRoutes)

app.listen({port, host}).then(()=> console.log("Server running!"))
