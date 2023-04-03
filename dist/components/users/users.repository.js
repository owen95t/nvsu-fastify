"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchUserById = exports.createUser = exports.getUserById = exports.getUserByUsername = void 0;
const utils_1 = require("../../helpers/utils");
const getUserByUsername = async (username) => {
    return utils_1.prisma.user.findFirst({
        where: {
            username,
        }
    });
};
exports.getUserByUsername = getUserByUsername;
const getUserById = async (id) => {
    return utils_1.prisma.user.findFirst({
        where: {
            id,
        }
    });
};
exports.getUserById = getUserById;
const createUser = async (data) => {
    return utils_1.prisma.user.create({
        data,
    });
};
exports.createUser = createUser;
const patchUserById = async (id, data) => {
    return utils_1.prisma.user.update({
        where: {
            id,
        },
        data,
    });
};
exports.patchUserById = patchUserById;
//# sourceMappingURL=users.repository.js.map