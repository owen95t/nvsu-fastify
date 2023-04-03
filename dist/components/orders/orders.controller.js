"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrder = exports.createOrder = exports.getOrders = exports.getOrder = void 0;
const OrderRepo = __importStar(require("./orders.repository"));
const http_constants_1 = require("../../helpers/http-constants");
const errors_1 = require("../../helpers/errors");
/**
 * Get Order by ID
 * @param req
 * @param reply
 */
const getOrder = async (req, reply) => {
    try {
        const order_id = +req.params.id;
        const order = await OrderRepo.getOrderById(order_id);
        if (!order) {
            return reply.code(http_constants_1.ERROR404.statusCode).send({ ...http_constants_1.ERROR404, message: 'No order found' });
        }
        return reply.code(http_constants_1.STANDARD.SUCCESS).send({
            statusCode: http_constants_1.STANDARD.SUCCESS,
            order,
        });
    }
    catch (e) {
        (0, errors_1.handleServerError)(reply, e);
    }
};
exports.getOrder = getOrder;
/**
 * Get All Orders under User
 * @param req
 * @param reply
 */
const getOrders = async (req, reply) => {
    try {
        const userId = req.authUser.id;
        const userOrders = await OrderRepo.getOrdersByUserId(userId);
        return reply.code(http_constants_1.STANDARD.SUCCESS).send({
            statusCode: http_constants_1.STANDARD.SUCCESS,
            orders: userOrders,
        });
    }
    catch (e) {
        (0, errors_1.handleServerError)(reply, e);
    }
};
exports.getOrders = getOrders;
/**
 * Create New Order
 * @param req
 * @param reply
 */
const createOrder = async (req, reply) => {
    try {
        const userId = req.authUser.id;
        const productIds = req.body.productIds;
        let productList = [];
        for (const id of productIds) {
            productList.push({
                productId: id
            });
        }
        const order = await OrderRepo.createOrder({
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
        });
        return reply.code(http_constants_1.STANDARD.CREATED).send({
            statusCode: http_constants_1.STANDARD.CREATED,
            order,
        });
    }
    catch (e) {
        (0, errors_1.handleServerError)(reply, e);
    }
};
exports.createOrder = createOrder;
/**
 * Cancel Order
 * @param req
 * @param reply
 */
const cancelOrder = async (req, reply) => {
    try {
        const orderId = req.params.id;
        await OrderRepo.updateOrderById(+orderId, {
            status: 'cancelled',
        });
        return reply.code(http_constants_1.STANDARD.SUCCESS).send({
            statusCode: http_constants_1.STANDARD.SUCCESS,
            message: 'Order cancelled'
        });
    }
    catch (e) {
        (0, errors_1.handleServerError)(reply, e);
    }
};
exports.cancelOrder = cancelOrder;
//# sourceMappingURL=orders.controller.js.map