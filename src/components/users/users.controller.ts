import {
    FastifyRequest,
    FastifyReply,
    RawServerBase,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
} from 'fastify';
import { handleServerError } from '../../helpers/errors';
import { IGetUserParams, IUserPatch } from '../../interfaces/users.interface';
import { ERROR404, STANDARD } from '../../helpers/http-constants';
import * as UserRepo from './users.repository'
import { User } from '@prisma/client';

function exclude<T, Key extends keyof T>(
    object: T,
    keys: Key[]
): Omit<T, Key> {
    for (let key of keys) {
        delete object[key]
    }
    return object
}

/**
 * Get User Details
 * @param req
 * @param reply
 */
export const getUser = async (req: FastifyRequest<{Params: IGetUserParams}>, reply: FastifyReply): Promise<void> => {
    try {
        const user_id: string = req.params.id
        const user: User = await UserRepo.getUserById(+user_id);
        if (!user) {
            return reply.code(ERROR404.statusCode).send({
                ...ERROR404,
                message: 'No user found'
            })
        }
        // delete user.password
        const userWithoutPassword: Omit<User, 'password'> = exclude(user, ['password'])
        return reply.code(STANDARD.SUCCESS).send({
            statusCode: STANDARD.SUCCESS,
            user: userWithoutPassword,
        });
    } catch (e) {
        handleServerError(reply, e)
    }
}

/**
 * Update User Details
 * @param req
 * @param reply
 */
export const patchUser = async (req: FastifyRequest<{Body: IUserPatch}>, reply: FastifyReply): Promise<void> => {
    try {
        const user: User = await UserRepo.patchUserById(req.authUser.id, req.body)
        const userWithoutPassword: Omit<User, 'password'> = exclude(user, ['password'])
        return reply.code(STANDARD.SUCCESS).send({
            statusCode: STANDARD.SUCCESS,
            user: userWithoutPassword,
        })
    } catch (e) {
        handleServerError(reply, e)
    }
}
