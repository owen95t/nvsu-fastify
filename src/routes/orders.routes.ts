import { FastifyTypebox } from '../types/fastify.typebox';
import * as OrderController from '../components/orders/orders.controller'
import { verifyJwt } from '../components/auth/auth.service';
import { CreateOrderSchema } from '../interfaces/orders.interface';

export const orderRouter = async (fastify: FastifyTypebox) => {
    fastify.route({
        method: 'GET',
        url: '/',
        preHandler: [verifyJwt],
        handler: OrderController.getOrders
    })
    fastify.route({
        method: 'POST',
        url: '/',
        schema: {
            body: CreateOrderSchema,
        },
        preHandler: [verifyJwt],
        handler: OrderController.createOrder
    })
    fastify.route({
        method: 'GET',
        url: '/:id',
        preHandler: [verifyJwt],
        handler: OrderController.getOrder
    })
    fastify.route({
        method: 'PATCH',
        url: '/:id',
        preHandler: [verifyJwt],
        handler: OrderController.cancelOrder
    })
}
