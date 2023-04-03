import { FastifyReply, FastifyRequest } from 'fastify';
import { handleServerError } from '../../helpers/errors';
import * as JWT from 'jsonwebtoken'
import server from '../../app';
import { ERROR401 } from '../../helpers/http-constants';

export const signJwt = async (id: number) => {
    return JWT.sign({id}, server.config.JWT_SECRET)
}

export const verifyJwt = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        if (request.headers.authorization) {
            const token = request.headers.authorization.split(' ')[1]
            if (token) {
                const user: any = await JWT.verify(token, server.config.JWT_SECRET)
                if (!user.id) {
                    return reply.code(ERROR401.statusCode).send(ERROR401)
                }
                request.authUser = user
            }
        } else {
            return reply.code(ERROR401.statusCode).send(ERROR401)
        }
    } catch (e) {
        handleServerError(reply, e)
    }
}

export const verifySameUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        if (request.headers.authorization) {
            const token = request.headers.authorization.split(' ')[1]
            if (token) {
                const user: any = await JWT.verify(token, server.config.JWT_SECRET)
                if (!user.id) {
                    return reply.code(ERROR401.statusCode).send(ERROR401)
                }
                if (+request.params['id'] !== +user.id) return reply.code(ERROR401.statusCode).send({
                    ...ERROR401,
                })
                request['authUser'] = user
            }
        } else {
            return reply.code(ERROR401.statusCode).send(ERROR401)
        }
    } catch (e) {
        handleServerError(reply, e)
    }
}
