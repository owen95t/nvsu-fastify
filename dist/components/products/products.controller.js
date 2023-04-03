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
exports.createProduct = exports.getProduct = exports.search = void 0;
const errors_1 = require("../../helpers/errors");
const ProductRepo = __importStar(require("./products.repository"));
const http_constants_1 = require("../../helpers/http-constants");
/**
 * Search Product
 * @param req
 * @param reply
 */
const search = async (req, reply) => {
    try {
        const searchTerm = req.query.search;
        const orderBy = req.query.orderBy ?? 'desc';
        const products = await ProductRepo.search(searchTerm, orderBy);
        return reply.code(http_constants_1.STANDARD.SUCCESS).send({
            products,
        });
    }
    catch (e) {
        (0, errors_1.handleServerError)(reply, e);
    }
};
exports.search = search;
/**
 * Get Product by ID
 * @param req
 * @param reply
 */
const getProduct = async (req, reply) => {
    try {
        const productId = req.params.id;
        const product = await ProductRepo.getProductById(+productId);
        if (!product) {
            return reply.code(http_constants_1.ERROR404.statusCode).send({
                ...http_constants_1.ERROR404,
                message: 'Product not found'
            });
        }
        return reply.code(http_constants_1.STANDARD.SUCCESS).send({
            statusCode: http_constants_1.STANDARD.SUCCESS,
            product,
        });
    }
    catch (e) {
        (0, errors_1.handleServerError)(reply, e);
    }
};
exports.getProduct = getProduct;
/**
 * For testing purposes
 * @param req
 * @param reply
 */
const createProduct = async (req, reply) => {
    try {
        const productName = req.body.name;
        const productPrice = req.body.price;
        const productDetails = req.body.details;
        const product = await ProductRepo.createProduct({
            name: productName,
            price: productPrice,
            details: productDetails,
        });
        return reply.code(http_constants_1.STANDARD.CREATED).send({
            statusCode: http_constants_1.STANDARD.CREATED,
            message: 'Product Created',
            product,
        });
    }
    catch (e) {
        (0, errors_1.handleServerError)(reply, e);
    }
};
exports.createProduct = createProduct;
//# sourceMappingURL=products.controller.js.map