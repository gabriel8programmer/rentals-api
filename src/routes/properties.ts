
import {FastifyInstance} from "fastify"
import { PropertiesController } from "../controllers/properties"

export const propertiesRoutes = async (fastify: FastifyInstance)=> {
    const controller = new PropertiesController()
    
    fastify.get("/properties", controller.index)
    fastify.get("/properties/:id", controller.show)
    fastify.post("/properties", controller.save)
    fastify.put("/properties/:id", controller.update)
    fastify.delete("/properties/:id", controller.delete)
}
