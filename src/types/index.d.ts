import fastify from 'fastify';

declare module 'fastify' {
    interface FastifyRequest {
        authUser?: {
            id: number,
        } | null
    }
}
