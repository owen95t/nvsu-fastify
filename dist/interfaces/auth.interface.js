"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthLogin = exports.UserAuthRegister = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.UserAuthRegister = typebox_1.Type.Required(typebox_1.Type.Object({
    username: typebox_1.Type.String({
        minLength: 4,
        maxLength: 8
    }),
    password: typebox_1.Type.String({
        minLength: 6,
        maxLength: 8
    }),
    confirmPassword: typebox_1.Type.String({
        minLength: 6,
        maxLength: 8,
    })
}));
exports.UserAuthLogin = typebox_1.Type.Object({
    username: typebox_1.Type.Required(typebox_1.Type.String({
        minLength: 4,
        maxLength: 8
    })),
    password: typebox_1.Type.Required(typebox_1.Type.String()),
});
//# sourceMappingURL=auth.interface.js.map