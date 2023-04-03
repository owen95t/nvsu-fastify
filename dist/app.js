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
const fastify_1 = __importDefault(require("fastify"));
const auth_routes_1 = require("./routes/auth.routes");
const cors_1 = __importDefault(require("@fastify/cors"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const users_routes_1 = require("./routes/users.routes");
const dotenv = __importStar(require("dotenv"));
const pino_1 = __importDefault(require("pino"));
const product_routes_1 = require("./routes/product.routes");
const orders_routes_1 = require("./routes/orders.routes");
dotenv.config();
const server = (0, fastify_1.default)({
    logger: (0, pino_1.default)({ level: 'info' }),
}).withTypeProvider();
server.register(auth_routes_1.authRouter, {
    prefix: '/api/auth'
});
server.register(users_routes_1.userRouter, {
    prefix: '/api/user'
});
server.register(product_routes_1.productRouter, {
    prefix: '/api/products'
});
server.register(orders_routes_1.orderRouter, {
    prefix: '/api/orders'
});
server.register(cors_1.default);
server.register(cookie_1.default);
server.register(jwt_1.default, {
    secret: 'top-secret-!!!'
});
// server.register(config)
// server.setErrorHandler((error, request, reply) => {
//     // server.log.error(error)
//     handleServerError(reply, error)
// })
exports.default = server;
//# sourceMappingURL=app.js.map