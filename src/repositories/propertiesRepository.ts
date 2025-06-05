import { Property, PropertyImage } from "@prisma/client";

export interface ICreatePropertyParams {
    title: string
    price: number
    propertyTypeId: string
    // optional params
    description?: string
    size?: number
    bedrooms?: number
    bathrooms?: number
    parkingSpaces?: number
    status?: "Available" | "Rented" | "Under_maintenance"
    location?: {
        city?: string
        state?: string
        locality?: string
        country?: string
        street?: string
        addressNumber?: string
        latitude?: string
        longitude?: string
        location?: string
        postalCode?: string
    }
}

export interface ICreateImageParams {
    url: string
    cover?: boolean
}

export interface IPropertiesRepository {
    find: ()=> Promise<Property[]>
    findById: (id: string)=> Promise<Property | null>
    create: (params: ICreatePropertyParams)=> Promise<Property>
    updateById: (id: string, data: Partial<ICreatePropertyParams>)=> Promise<Property | null>
    deleteById: (id: string) => Promise<void>
    findImagesFromProperty: (id: string)=> Promise<PropertyImage[]>
    findImageByIdFromProperty: (id: string, imageId: string)=> Promise<PropertyImage | null>
    addImageInProperty: (id: string, params: ICreateImageParams )=> Promise<void>
    removeImageByIdFromProperty: (id: string, imageId: string)=> Promise<void>
}