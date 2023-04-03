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
exports.userRouter = void 0;
const UserController = __importStar(require("../components/users/users.controller"));
const auth_service_1 = require("../components/auth/auth.service");
const users_interface_1 = require("../interfaces/users.interface");
const userRouter = async (fastify) => {
    fastify.route({
        method: 'GET',
        url: '/:id',
        preHandler: [auth_service_1.verifyJwt, auth_service_1.verifySameUser],
        handler: UserController.getUser
    });
    fastify.route({
        method: 'PATCH',
        url: '/',
        schema: {
            body: users_interface_1.UserPatch,
        },
        preHandler: [auth_service_1.verifyJwt],
        handler: UserController.patchUser
    });
};
exports.userRouter = userRouter;
//# sourceMappingURL=users.routes.js.map