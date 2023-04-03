"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.CreateProductSchema = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    details: typebox_1.Type.String(),
    price: typebox_1.Type.Number(),
});
//# sourceMappingURL=products.interface.js.map