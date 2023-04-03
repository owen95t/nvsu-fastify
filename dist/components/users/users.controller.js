"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchUser = exports.getUser = void 0;
const errors_1 = require("../../helpers/errors");
const http_constants_1 = require("../../helpers/http-constants");
const UserRepo = __importStar(require("./users.repository"));
function exclude(object, keys) {
    for (let key of keys) {
        delete object[key];
    }
    return object;
}
/**
 * Get User Details
 * @param req
 * @param reply
 */
const getUser = async (req, reply) => {
    try {
        const user_id = req.params.id;
        const user = await UserRepo.getUserById(+user_id);
        if (!user) {
            return reply.code(http_constants_1.ERROR404.statusCode).send({
                ...http_constants_1.ERROR404,
                message: 'No user found'
            });
        }
        // delete user.password
        const userWithoutPassword = exclude(user, ['password']);
        return reply.code(http_constants_1.STANDARD.SUCCESS).send({
            statusCode: http_constants_1.STANDARD.SUCCESS,
            user: userWithoutPassword,
        });
    }
    catch (e) {
        (0, errors_1.handleServerError)(reply, e);
    }
};
exports.getUser = getUser;
/**
 * Update User Details
 * @param req
 * @param reply
 */
const patchUser = async (req, reply) => {
    try {
        const user = await UserRepo.patchUserById(req.authUser.id, req.body);
        const userWithoutPassword = exclude(user, ['password']);
        return reply.code(http_constants_1.STANDARD.SUCCESS).send({
            statusCode: http_constants_1.STANDARD.SUCCESS,
            user: userWithoutPassword,
        });
    }
    catch (e) {
        (0, errors_1.handleServerError)(reply, e);
    }
};
exports.patchUser = patchUser;
//# sourceMappingURL=users.controller.js.map