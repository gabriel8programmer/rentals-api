
import "dotenv/config"
import Fastify from "fastify";
import { envSchema } from "./types/env";
import { PropertiesController } from "./controllers/properties";

const app = Fastify()

const port = envSchema.parse(process.env).PORT || 3000
const host = "0.0.0.0"

const  propertyController = new PropertiesController()

// Property's endpoints
app.get("/properties", propertyController.index)
app.get("/properties/:id", propertyController.show)
app.post("/properties", propertyController.save)
app.put("/properties/:id", propertyController.update)
app.delete("/properties/:id", propertyController.delete)

app.listen({port, host}).then(()=> console.log("Server running!"))