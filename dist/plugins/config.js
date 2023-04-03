"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typebox_1 = require("@sinclair/typebox");
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const ConfigSchema = typebox_1.Type.Strict(typebox_1.Type.Object({
    PORT: typebox_1.Type.String(),
    JWT_SECRET: typebox_1.Type.String(),
}));
const configPlugin = async (server) => {
    // const validate = ajv.compile(ConfigSchema);
    // const valid = validate(process.env);
    // if (!valid) {
    //     throw new Error(
    //         ".env file validation failed - " +
    //         JSON.stringify(validate.errors, null, 2)
    //     );
    // }
    server.decorate("config", process.env);
};
exports.default = (0, fastify_plugin_1.default)(configPlugin);
//# sourceMappingURL=config.js.map