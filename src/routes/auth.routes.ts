import * as AuthController from '../components/auth/auth.controller';
import { FastifyTypebox } from '../types/fastify.typebox';
import { UserAuthLogin, UserAuthRegister } from '../interfaces/auth.interface';
import { FastifyInstance } from 'fastify';

export const authRouter = async (fastify: FastifyInstance) => {
    fastify.route({
        method: 'POST',
        url: '/register',
        schema: {
            body: UserAuthRegister
        },
        handler: AuthController.register
    })

    fastify.route({
        method: 'POST',
        url: '/login',
        schema: {
            body: UserAuthLogin
        },
        handler: AuthController.login,
    })

    fastify.route({
        method: 'POST',
        url: '/logout',
        handler: AuthController.logout
    })
}
