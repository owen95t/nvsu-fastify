import server from './app';
import config from './plugins/config';

const start = async () => {
    try {
        await server.register(config)
        await server.listen({
            port: +server.config.PORT || 3000
        })
    } catch (err) {
        console.log(err)
        // server.log.error(err)
        process.exit(1)
    }
}
start()
