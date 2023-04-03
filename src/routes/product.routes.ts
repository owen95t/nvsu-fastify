import { FastifyInstance } from 'fastify';
import * as ProductController from '../components/products/products.controller'
import { verifyJwt } from '../components/auth/auth.service';
import { CreateProductSchema } from '../interfaces/products.interface';

export const productRouter = async (fastify: FastifyInstance) => {
    fastify.route({
        method: 'GET',
        url: '/:id',
        handler: ProductController.getProduct
    })

    fastify.route({
        method: 'GET',
        url: '/',
        handler: ProductController.search
    })

    fastify.route({
        method: 'POST',
        url: '/',
        schema: {
            body: CreateProductSchema
        },
        preHandler: [verifyJwt],
        handler: ProductController.createProduct,
    })

}
