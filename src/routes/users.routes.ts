import { FastifyTypebox } from '../types/fastify.typebox';
import * as UserController from '../components/users/users.controller'
import { verifyJwt, verifySameUser } from '../components/auth/auth.service';
import { UserPatch } from '../interfaces/users.interface';

export const userRouter = async (fastify: FastifyTypebox) => {
    fastify.route({
        method: 'GET',
        url: '/:id',
        preHandler: [verifyJwt, verifySameUser],
        handler: UserController.getUser
    })

    fastify.route({
        method: 'PATCH',
        url: '/',
        schema: {
            body: UserPatch,
        },
        preHandler: [verifyJwt],
        handler: UserController.patchUser
    })
}
