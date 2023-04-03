import { Static, Type } from '@sinclair/typebox';

export const CreateOrderSchema = Type.Object({
    productIds: Type.Array(
        Type.Number()
    )
})

export type ICreateOrder = Static<typeof CreateOrderSchema>

export interface ICancelOrderParams {
    id: string
}

export interface IGetOrderParam {
    id: string
}


