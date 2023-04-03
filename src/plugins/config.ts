import "dotenv/config";
import { Static, Type } from '@sinclair/typebox';
import fp from "fastify-plugin";
import { FastifyPluginAsync } from 'fastify';

const ConfigSchema = Type.Strict(
    Type.Object({
        PORT: Type.String(),
        JWT_SECRET: Type.String(),
    })
);

export type Config = Static<typeof ConfigSchema>;

const configPlugin: FastifyPluginAsync = async (server) => {
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

declare module 'fastify' {
    interface FastifyInstance {
        config: Config,
    }
}

export default fp(configPlugin);
