import { FastifyRequest, FastifyReply } from 'fastify';
import * as OrderRepo from './orders.repository'
import { Order } from '@prisma/client';
import { ERROR404, STANDARD } from '../../helpers/http-constants';
import { handleServerError } from '../../helpers/errors';
import { ICancelOrderParams, ICreateOrder, IGetOrderParam } from '../../interfaces/orders.interface';

/**
 * Get Order by ID
 * @param req
 * @param reply
 */
export const getOrder = async (req: FastifyRequest<{Params: IGetOrderParam}>, reply: FastifyReply): Promise<void> => {
    try {
        const order_id: number = +req.params.id
        const order: Order = await OrderRepo.getOrderById(order_id)
        if (!order) {
            return reply.code(ERROR404.statusCode).send({...ERROR404, message: 'No order found'})
        }
        return reply.code(STANDARD.SUCCESS).send({
            statusCode: STANDARD.SUCCESS,
            order,
        })
    } catch (e) {
        handleServerError(reply, e)
    }
}

/**
 * Get All Orders under User
 * @param req
 * @param reply
 */
export const getOrders = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const userId = req.authUser.id
        const userOrders: Order[] = await OrderRepo.getOrdersByUserId(userId)
        return reply.code(STANDARD.SUCCESS).send({
            statusCode: STANDARD.SUCCESS,
            orders: userOrders,
        })
    } catch (e) {
        handleServerError(reply, e)
    }
}

/**
 * Create New Order
 * @param req
 * @param reply
 */
export const createOrder = async (req: FastifyRequest<{Body: ICreateOrder}>, reply: FastifyReply): Promise<void> => {
    try {
        const userId = req.authUser.id
        const productIds: number[] = req.body.productIds
        let productList = []
        for(const id of productIds) {
            productList.push({
                productId: id
            })
        }
        const order: Order = await OrderRepo.createOrder({
            user: {
                connect: {
                    id: userId
                }
            },
            OrderItems: {
                create: [
                    ...productList
                ]
            },
        })
        return reply.code(STANDARD.CREATED).send({
            statusCode: STANDARD.CREATED,
            order,
        })
    } catch (e) {
        handleServerError(reply, e)
    }
}

/**
 * Cancel Order
 * @param req
 * @param reply
 */
export const cancelOrder = async (req: FastifyRequest<{Params: ICancelOrderParams}>, reply: FastifyReply): Promise<void> => {
    try {
        const orderId: string = req.params.id
        await OrderRepo.updateOrderById(+orderId, {
            status: 'cancelled',
        })
        return reply.code(STANDARD.SUCCESS).send({
            statusCode: STANDARD.SUCCESS,
            message: 'Order cancelled'
        })
    } catch (e) {
        handleServerError(reply, e)
    }
}
