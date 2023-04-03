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
exports.authRouter = void 0;
const AuthController = __importStar(require("../components/auth/auth.controller"));
const auth_interface_1 = require("../interfaces/auth.interface");
const authRouter = async (fastify) => {
    fastify.route({
        method: 'POST',
        url: '/register',
        schema: {
            body: auth_interface_1.UserAuthRegister
        },
        handler: AuthController.register
    });
    fastify.route({
        method: 'POST',
        url: '/login',
        schema: {
            body: auth_interface_1.UserAuthLogin
        },
        handler: AuthController.login,
    });
    fastify.route({
        method: 'POST',
        url: '/logout',
        handler: AuthController.logout
    });
};
exports.authRouter = authRouter;
//# sourceMappingURL=auth.routes.js.map