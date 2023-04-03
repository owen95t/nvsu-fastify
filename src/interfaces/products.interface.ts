import { Static, Type } from '@sinclair/typebox';

export interface IGetProductParams {
    id: string,
}

export interface IQueryProductQueryParams {
    search?: string,
    orderBy?: string
}

export const CreateProductSchema = Type.Object({
    name: Type.String(),
    details: Type.String(),
    price: Type.Number(),
})

export type ICreateProduct = Static<typeof CreateProductSchema>
