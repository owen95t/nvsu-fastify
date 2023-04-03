"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.createProduct = exports.getProductById = void 0;
const utils_1 = require("../../helpers/utils");
const getProductById = async (id) => {
    return utils_1.prisma.product.findFirst({
        where: {
            id,
        }
    });
};
exports.getProductById = getProductById;
const createProduct = async (data) => {
    return utils_1.prisma.product.create({
        data,
    });
};
exports.createProduct = createProduct;
const search = async (searchTerm = '', orderBy) => {
    if (searchTerm) {
        return utils_1.prisma.product.findMany({
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
        });
    }
    else {
        return utils_1.prisma.product.findMany({
            orderBy: {
                createdAt: orderBy
            }
        });
    }
};
exports.search = search;
//# sourceMappingURL=products.repository.js.map