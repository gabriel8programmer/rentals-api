import { PropertyType } from '@prisma/client'

export interface IPropertyTypesRepository {
  find: () => Promise<PropertyType[]>
  findById: (id: string) => Promise<PropertyType | null>
  create: (params: { name: string }) => Promise<PropertyType>
  updateById: (id: string, params: { name: string }) => Promise<PropertyType | null>
  deleteById: (id: string) => Promise<PropertyType | null>
}
