
import { FastifyInstance } from "fastify";
import { PropertiesController } from "../controllers/properties";

export default async function router(app: FastifyInstance){
    const  controller = new PropertiesController()
    
    app.get("/properties", controller.index)
    app.get("/properties/:id", controller.show)
    app.post("/properties", controller.save)
    app.put("/properties/:id", controller.update)
    app.delete("/properties/:id", controller.delete)
}