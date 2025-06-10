
import { FastifyInstance } from "fastify";
import { PropertiesController } from "../../controllers/PropertiesController";
import { PropertiesModel } from "../../models/Property";
import { PropertyServices } from "../../services/PropertyServices";

export async function propertiesRouter(app: FastifyInstance){
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