"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerError = void 0;
const http_constants_1 = require("./http-constants");
function handleServerError(reply, error) {
    console.log(error);
    return reply.status(http_constants_1.ERROR500.statusCode).send({
        ...http_constants_1.ERROR500,
        error: error.message,
    });
}
exports.handleServerError = handleServerError;
//# sourceMappingURL=errors.js.map