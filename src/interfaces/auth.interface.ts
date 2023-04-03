import { Static, Type } from '@sinclair/typebox'
import { FastifyRequest } from 'fastify';

export const UserAuthRegister = Type.Required(
    Type.Object({
        username: Type.String({
            minLength: 4,
            maxLength: 8
        }),
        password: Type.String({
            minLength: 6,
            maxLength: 8
        }),
        confirmPassword: Type.String({
            minLength: 6,
            maxLength: 8,
        })
    })
);

export type IUserAuthRegister = Static<typeof UserAuthRegister>

export interface IUserAuthRegisterRequest extends FastifyRequest {
    body: IUserAuthRegister
}

export const UserAuthLogin = Type.Object({
    username: Type.Required(
        Type.String({
            minLength: 4,
            maxLength: 8
        })
    ),
    password: Type.Required(
        Type.String()
    ),
})

export type IUserAuthLogin = Static<typeof UserAuthLogin>

export interface IUserAuthLoginRequest extends FastifyRequest {
    body: IUserAuthLogin,
}
