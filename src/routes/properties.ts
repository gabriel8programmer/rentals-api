
import { FastifyInstance } from "fastify";
import { PropertiesController } from "../controllers/propertiesController";
import { PropertiesModel } from "../models/properties";
import { PropertyServices } from "../services/propertyServices";

export default async function router(app: FastifyInstance){
    // get instances
    const model = new PropertiesModel()
    const service = new PropertyServices(model)
    const controller = new PropertiesController(service)
    
    app.get("/properties", controller.index)
    app.get("/properties/:id", controller.show)
    app.post("/properties", controller.save)
    app.put("/properties/:id", controller.update)
    app.delete("/properties/:id", controller.delete)

    app.get("/properties/:id/images", controller.images)
    app.post("/properties/:id/images", controller.addImage)
    app.delete("/properties/:id/images/:imageId", controller.removeImage)
}