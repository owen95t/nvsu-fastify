import { prisma } from '../../helpers/utils';
import { Order, Prisma } from '@prisma/client';

export const getOrderById = async (id: number) => {
    return prisma.order.findFirst({
        where: {
            id,
        },
        include: {
            OrderItems: {
                include: {
                    product: true
                }
            }
        }
    })
}

export const getOrdersByUserId = async (userId: number) => {
    return prisma.order.findMany({
        where: {
            userId,
        },
        include: {
            OrderItems: {
                include: {
                    product: true
                }
            }
        }
    })
}

export const updateOrderById = async (orderId: number, data: Prisma.OrderUpdateInput) => {
    return prisma.order.update({
        where: {
            id: orderId,
        },
        data,
    })
}

export const createOrder = async (data: Prisma.OrderCreateInput) => {
    return prisma.order.create({
        data,
        include: {
            OrderItems: {
                include: {
                    product: true
                }
            }
        }
    })
}
