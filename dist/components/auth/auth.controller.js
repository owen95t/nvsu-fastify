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
exports.logout = exports.login = exports.register = void 0;
const errors_1 = require("../../helpers/errors");
const http_constants_1 = require("../../helpers/http-constants");
const bcrypt = __importStar(require("bcryptjs"));
const UserRepo = __importStar(require("../users/users.repository"));
const AuthService = __importStar(require("./auth.service"));
/**
 * Register New User
 * @param req
 * @param reply
 */
const register = async (req, reply) => {
    try {
        const username = req.body.username;
        // Check if user with this username already exists
        const user = await UserRepo.getUserByUsername(username);
        if (user) {
            return reply.status(http_constants_1.ERROR400.statusCode).send({
                ...http_constants_1.ERROR400,
                message: 'User with this username already exists. Please try a different username'
            });
        }
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        // Check if password and confirmPassword is the same
        if (password !== confirmPassword) {
            return reply.status(http_constants_1.ERROR400.statusCode).send({
                ...http_constants_1.ERROR400,
                message: 'Password confirmation is different that password'
            });
        }
        // Hash password
        const hashedPass = await bcrypt.hash(password, 10);
        // Register (Create User)
        await UserRepo.createUser({
            username,
            password: hashedPass,
        });
        return reply.status(http_constants_1.STANDARD.CREATED).send({
            statusCode: http_constants_1.STANDARD.CREATED,
            message: 'Success! Please Log In'
        });
    }
    catch (e) {
        (0, errors_1.handleServerError)(reply, e);
    }
};
exports.register = register;
/**
 * Login User
 * @param req
 * @param reply
 */
const login = async (req, reply) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        // Get user
        const user = await UserRepo.getUserByUsername(username);
        // Check if password is same as hashed password
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return reply.status(http_constants_1.ERROR401.statusCode).send({
                    ...http_constants_1.ERROR401,
                    message: 'Username or password invalid'
                });
            }
        }
        else {
            return reply.status(http_constants_1.ERROR400.statusCode).send({
                ...http_constants_1.ERROR400,
                message: 'No user found. Please register'
            });
        }
        const token = await AuthService.signJwt(user.id);
        return reply.status(http_constants_1.STANDARD.SUCCESS).setCookie('Authorization', `Bearer ${token}`, {
            httpOnly: true,
            secure: false,
        }).send({
            statusCode: http_constants_1.STANDARD.SUCCESS,
            message: 'Login Success!'
        });
    }
    catch (e) {
        (0, errors_1.handleServerError)(reply, e);
    }
};
exports.login = login;
/**
 * Logout user
 * @param req
 * @param reply
 */
const logout = async (req, reply) => {
    try {
        return reply.status(http_constants_1.STANDARD.SUCCESS).setCookie('Authorization', '')
            .send({ message: 'Success!' });
    }
    catch (e) {
        (0, errors_1.handleServerError)(reply, e);
    }
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map