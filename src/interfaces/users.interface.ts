import { Static, Type } from '@sinclair/typebox';
import { FastifyReply, FastifyRequest } from 'fastify';

export type IUser = {
    id: number,
    username: string,
}

export type IGetUserParams = {
    id: string
}

// export interface IUserPatch {
//     name: string,
// }

export const UserPatch = Type.Object({
    name: Type.Required(
        Type.String({
            minLength: 3,
            maxLength: 10,
        })
    )
})

export type IUserPatch = Static<typeof UserPatch>

