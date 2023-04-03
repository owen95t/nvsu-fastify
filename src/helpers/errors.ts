import { FastifyReply } from 'fastify';
import { ERROR500 } from './http-constants';

export function handleServerError(reply: FastifyReply, error: any) {
    console.log(error)
    return reply.status(ERROR500.statusCode).send({
        ...ERROR500,
        error: error.message,
    });
}
