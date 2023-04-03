"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./plugins/config"));
const start = async () => {
    try {
        await app_1.default.register(config_1.default);
        await app_1.default.listen({
            port: +app_1.default.config.PORT || 3000
        });
    }
    catch (err) {
        console.log(err);
        // server.log.error(err)
        process.exit(1);
    }
};
start();
//# sourceMappingURL=index.js.map