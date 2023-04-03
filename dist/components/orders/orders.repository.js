"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.updateOrderById = exports.getOrdersByUserId = exports.getOrderById = void 0;
const utils_1 = require("../../helpers/utils");
const getOrderById = async (id) => {
    return utils_1.prisma.order.findFirst({
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
    });
};
exports.getOrderById = getOrderById;
const getOrdersByUserId = async (userId) => {
    return utils_1.prisma.order.findMany({
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
    });
};
exports.getOrdersByUserId = getOrdersByUserId;
const updateOrderById = async (orderId, data) => {
    return utils_1.prisma.order.update({
        where: {
            id: orderId,
        },
        data,
    });
};
exports.updateOrderById = updateOrderById;
const createOrder = async (data) => {
    return utils_1.prisma.order.create({
        data,
        include: {
            OrderItems: {
                include: {
                    product: true
                }
            }
        }
    });
};
exports.createOrder = createOrder;
//# sourceMappingURL=orders.repository.js.map