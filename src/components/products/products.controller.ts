import { FastifyRequest, FastifyReply } from 'fastify';
import { handleServerError } from '../../helpers/errors';
import { IGetProductParams, IQueryProductQueryParams } from '../../interfaces/products.interface';
import { Prisma, Product } from '@prisma/client';
import * as ProductRepo from './products.repository'
import { ERROR404, STANDARD } from '../../helpers/http-constants';

/**
 * Search Product
 * @param req
 * @param reply
 */
export const search = async (req: FastifyRequest<{Querystring: IQueryProductQueryParams}>, reply: FastifyReply): Promise<void> => {
    try {
        const searchTerm: string = req.query.search
        const orderBy: string = req.query.orderBy ?? 'desc'
        const products: Product[] | [] = await ProductRepo.search(searchTerm, orderBy)
        return reply.code(STANDARD.SUCCESS).send({
            products,
        })
    } catch (e) {
        handleServerError(reply, e)
    }
}

/**
 * Get Product by ID
 * @param req
 * @param reply
 */
export const getProduct = async (req: FastifyRequest<{Params: IGetProductParams}>, reply: FastifyReply): Promise<void> => {
    try  {
        const productId: string = req.params.id
        const product: Product = await ProductRepo.getProductById(+productId)
        if (!product) {
            return reply.code(ERROR404.statusCode).send({
                ...ERROR404,
                message: 'Product not found'
            });
        }
        return reply.code(STANDARD.SUCCESS).send({
            statusCode: STANDARD.SUCCESS,
            product,
        });
    } catch (e) {
        handleServerError(reply, e)
    }
}

/**
 * For testing purposes
 * @param req
 * @param reply
 */
export const createProduct = async (req: FastifyRequest<{Body: Prisma.ProductCreateInput}>, reply: FastifyReply) => {
    try {
        const productName = req.body.name
        const productPrice = req.body.price
        const productDetails = req.body.details
        const product = await ProductRepo.createProduct({
            name: productName,
            price: productPrice,
            details: productDetails,
        })
        return reply.code(STANDARD.CREATED).send({
            statusCode: STANDARD.CREATED,
            message: 'Product Created',
            product,
        })
    } catch (e) {
        handleServerError(reply, e)
    }
}
