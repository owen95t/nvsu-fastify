"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPatch = void 0;
const typebox_1 = require("@sinclair/typebox");
// export interface IUserPatch {
//     name: string,
// }
exports.UserPatch = typebox_1.Type.Object({
    name: typebox_1.Type.Required(typebox_1.Type.String({
        minLength: 3,
        maxLength: 10,
    }))
});
//# sourceMappingURL=users.interface.js.map