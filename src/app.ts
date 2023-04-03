import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { authRouter } from './routes/auth.routes';
import cors from '@fastify/cors'
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt'
import { userRouter } from './routes/users.routes';
import * as dotenv from 'dotenv'
import config from './plugins/config';
import pino from 'pino'
import { handleServerError } from './helpers/errors';
import { productRouter } from './routes/product.routes';
import { orderRouter } from './routes/orders.routes';
dotenv.config()
const server = fastify({
    logger: pino({ level: 'info' }),
}).withTypeProvider<TypeBoxTypeProvider>()

server.register(authRouter, {
    prefix: '/api/auth'
})
server.register(userRouter, {
    prefix: '/api/user'
})
server.register(productRouter, {
    prefix: '/api/products'
})
server.register(orderRouter, {
    prefix: '/api/orders'
})
server.register(cors)
server.register(fastifyCookie)
server.register(fastifyJwt, {
    secret: 'top-secret-!!!'
})
// server.register(config)
// server.setErrorHandler((error, request, reply) => {
//     // server.log.error(error)
//     handleServerError(reply, error)
// })
export default server
