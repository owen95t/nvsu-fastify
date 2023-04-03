"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.CreateOrderSchema = typebox_1.Type.Object({
    productIds: typebox_1.Type.Array(typebox_1.Type.Number())
});
//# sourceMappingURL=orders.interface.js.map