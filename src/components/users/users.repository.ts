import { prisma } from '../../helpers/utils';
import { IUserPatch } from '../../interfaces/users.interface';
import { IUserAuthRegister } from '../../interfaces/auth.interface';

export const getUserByUsername = async (username: string) => {
    return prisma.user.findFirst({
        where: {
            username,
        }
    })
}

export const getUserById = async (id: number) => {
    return prisma.user.findFirst({
        where: {
            id,
        }
    })
}

export const createUser = async (data: Omit<IUserAuthRegister, 'confirmPassword'>) => {
    return prisma.user.create({
        data,
    })
}

export const patchUserById = async (id: number, data: IUserPatch) => {
    return prisma.user.update({
        where: {
            id,
        },
        data,
    })
}
