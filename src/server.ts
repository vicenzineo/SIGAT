import Fastify from "fastify";
import clientesRoutes from "./routes/cliente.route.js";
import tecnicosRoutes from "./routes/tecnico.route.js";

const fastify = Fastify({ logger: true });
let numero = 0;

fastify.get("/", async () => {
    numero++;
    return { api: "seraph-api", acesso: numero };
});

fastify.register(clientesRoutes, { prefix: "/clientes" });
fastify.register(tecnicosRoutes, { prefix: "/tecnicos" });

const start = async () => {
    try {// Inicia o servidor na porta 3000
        await fastify.listen({ port: 3000 })
    } catch (err) {
        //registra no log caso erro ao iniciar
        fastify.log.error(err)
        process.exit(1) } }
start() // Executa a função start
