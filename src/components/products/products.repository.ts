import { prisma } from '../../helpers/utils';
import { Prisma, Product } from '@prisma/client';

export const getProductById = async (id: number): Promise<Product | null> => {
    return prisma.product.findFirst({
        where: {
            id,
        }
    })
}

export const createProduct = async (data: Prisma.ProductCreateInput): Promise<Product | null> => {
    return prisma.product.create({
        data,
    })
}

export const search = async (searchTerm = '', orderBy) => {
    if (searchTerm) {
        return prisma.product.findMany({
            where: {
                name: {
                    contains: searchTerm
                },
                OR: {
                    details: {
                        contains: searchTerm
                    }
                }
            },
            orderBy: {
                createdAt: orderBy
            }
        })
    } else {
        return prisma.product.findMany({
            orderBy: {
                createdAt: orderBy
            }
        })
    }
}
