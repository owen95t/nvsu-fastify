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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySameUser = exports.verifyJwt = exports.signJwt = void 0;
const errors_1 = require("../../helpers/errors");
const JWT = __importStar(require("jsonwebtoken"));
const app_1 = __importDefault(require("../../app"));
const http_constants_1 = require("../../helpers/http-constants");
const signJwt = async (id) => {
    return JWT.sign({ id }, app_1.default.config.JWT_SECRET);
};
exports.signJwt = signJwt;
const verifyJwt = async (request, reply) => {
    try {
        if (request.headers.authorization) {
            const token = request.headers.authorization.split(' ')[1];
            if (token) {
                const user = await JWT.verify(token, app_1.default.config.JWT_SECRET);
                if (!user.id) {
                    return reply.code(http_constants_1.ERROR401.statusCode).send(http_constants_1.ERROR401);
                }
                request.authUser = user;
            }
        }
        else {
            return reply.code(http_constants_1.ERROR401.statusCode).send(http_constants_1.ERROR401);
        }
    }
    catch (e) {
        (0, errors_1.handleServerError)(reply, e);
    }
};
exports.verifyJwt = verifyJwt;
const verifySameUser = async (request, reply) => {
    try {
        if (request.headers.authorization) {
            const token = request.headers.authorization.split(' ')[1];
            if (token) {
                const user = await JWT.verify(token, app_1.default.config.JWT_SECRET);
                if (!user.id) {
                    return reply.code(http_constants_1.ERROR401.statusCode).send(http_constants_1.ERROR401);
                }
                if (+request.params['id'] !== +user.id)
                    return reply.code(http_constants_1.ERROR401.statusCode).send({
                        ...http_constants_1.ERROR401,
                    });
                request['authUser'] = user;
            }
        }
        else {
            return reply.code(http_constants_1.ERROR401.statusCode).send(http_constants_1.ERROR401);
        }
    }
    catch (e) {
        (0, errors_1.handleServerError)(reply, e);
    }
};
exports.verifySameUser = verifySameUser;
//# sourceMappingURL=auth.service.js.map