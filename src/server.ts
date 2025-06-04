
import "dotenv/config"
import Fastify from "fastify";
import { envSchema } from "./types/env";

import {propertiesRoutes} from "./routes/properties"

const app = Fastify()

const port = envSchema.parse(process.env).PORT || 3000
const host = "0.0.0.0"

// register routes
app.register(propertiesRoutes) // properties

app.listen({port, host}).then(()=> console.log("Server running!"))