import { z } from "zod"

export const CreatePropertySchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    price: z.number(),
    size: z.number().optional(),
    bedrooms: z.number().optional(),
    bathrooms: z.number().optional(),
    parkingSpaces: z.number().optional(),
    status: z.enum(["Available", "Rented", "Under_maintenance"]).optional(),
    location: z.object({
        city: z.string().optional(),
        state: z.string().optional(),
        locality: z.string().optional(),
        country: z.string().optional(),
        street: z.string().optional(),
        addressNumber: z.string().optional(),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        location: z.string().optional(),
        postalCode: z.string().optional(),
    }).optional(),
    propertyTypeId: z.string()
})

export const UpdatePropertySchema = CreatePropertySchema.partial()

export const RouteParamsSchema = z.object({
    id: z.string(),
    imageId: z.string().optional()
})

export const AddImageSchema = z.object({
    url: z.string(),
    cover: z.boolean().default(false)
})
