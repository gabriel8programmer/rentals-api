
import "dotenv/config"
import Fastify from "fastify";
import { envSchema } from "./types/env";
import { PropertiesController } from "./controllers/properties";
import { PropertyTypesController } from "./controllers/property-types";

const app = Fastify()

const port = envSchema.parse(process.env).PORT || 3000
const host = "0.0.0.0"

const  propertyController = new PropertiesController()
const propertyTypesController = new PropertyTypesController()

// Property's endpoints
app.get("/properties", propertyController.index)
app.get("/properties/:id", propertyController.show)
app.post("/properties", propertyController.save)
app.put("/properties/:id", propertyController.update)
app.delete("/properties/:id", propertyController.delete)
// Property type's endpoints
app.get("/property-types", propertyTypesController.index)
app.post("/property-types", propertyTypesController.save)
app.patch("/property-types/:id", propertyTypesController.update)
app.delete("/property-types/:id", propertyTypesController.delete)

app.listen({port, host}).then(()=> console.log("Server running!"))