import { FastifyRequest, FastifyReply } from 'fastify';
import {
    IUserAuthLogin,
    IUserAuthRegister,
} from '../../interfaces/auth.interface';
import { handleServerError } from '../../helpers/errors';
import { ERROR400, ERROR401, STANDARD } from '../../helpers/http-constants';
import * as bcrypt from 'bcryptjs'
import * as UserRepo  from '../users/users.repository';
import * as AuthService from './auth.service'
import { User } from '@prisma/client';

/**
 * Register New User
 * @param req
 * @param reply
 */
export const register = async (req: FastifyRequest<{Body: IUserAuthRegister}>, reply: FastifyReply): Promise<void> => {
    try {
        const username: string = req.body.username
        // Check if user with this username already exists
        const user: User = await UserRepo.getUserByUsername(username)
        if (user) {
            return reply.status(ERROR400.statusCode).send({
                ...ERROR400,
                message: 'User with this username already exists. Please try a different username'
            })
        }
        const password: string = req.body.password;
        const confirmPassword: string = req.body.confirmPassword
        // Check if password and confirmPassword is the same
        if (password !== confirmPassword) {
            return reply.status(ERROR400.statusCode).send({
                ...ERROR400,
                message: 'Password confirmation is different that password'
            })
        }
        // Hash password
        const hashedPass: string = await bcrypt.hash(password, 10)
        // Register (Create User)
        await UserRepo.createUser({
            username,
            password: hashedPass,
        })
        return reply.status(STANDARD.CREATED).send({
            statusCode: STANDARD.CREATED,
            message: 'Success! Please Log In'
        });
    } catch (e) {
        handleServerError(reply, e)
    }
}

/**
 * Login User
 * @param req
 * @param reply
 */
export const login = async (req: FastifyRequest<{Body: IUserAuthLogin}>, reply: FastifyReply): Promise<void> => {
    try {
        const username: string = req.body.username
        const password: string = req.body.password
        // Get user
        const user = await UserRepo.getUserByUsername(username)
        // Check if password is same as hashed password
        if (user) {
            const match: boolean = await bcrypt.compare(password, user.password)
            if (!match) {
                return reply.status(ERROR401.statusCode).send({
                    ...ERROR401,
                    message: 'Username or password invalid'
                })
            }
        } else {
            return reply.status(ERROR400.statusCode).send({
                ...ERROR400,
                message: 'No user found. Please register'
            })
        }
        const token: string = await AuthService.signJwt(user.id)
        return reply.status(STANDARD.SUCCESS).setCookie('Authorization', `Bearer ${token}`, {
            httpOnly: true,
            secure: false,
        }).send({
            statusCode: STANDARD.SUCCESS,
            message: 'Login Success!'
        })
    } catch (e) {
        handleServerError(reply, e)
    }
}

/**
 * Logout user
 * @param req
 * @param reply
 */
export const logout = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        return reply.status(STANDARD.SUCCESS).setCookie('Authorization', '')
            .send({message: 'Success!'})
    } catch (e) {
        handleServerError(reply, e)
    }
}
