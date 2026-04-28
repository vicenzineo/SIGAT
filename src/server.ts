import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import clientesRoutes from "./routes/cliente.route.js";
import tecnicosRoutes from "./routes/tecnico.route.js";
import equipamentosRoutes from "./routes/equipamento.route.js";
import servicosRoutes from "./routes/servico.route.js";
import pecasRoutes from "./routes/peca.route.js";

const fastify = Fastify({ logger: true });
let numero = 0;

await fastify.register(cors, {
    origin: "*",
    methods: "*",
});

await fastify.register(fastifySwagger, {
    openapi: {
        info: {
            title: "SIGAT API",
            description: "API REST para gestao de assistencia tecnica",
            version: "1.0.0",
        },
        servers: [{ url: "http://localhost:3000" }],
    },
});

await fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs",
});

fastify.get("/", async () => {
    numero++;
    return { api: "seraph-api", acesso: numero };
});

fastify.register(clientesRoutes, { prefix: "/clientes" });
fastify.register(tecnicosRoutes, { prefix: "/tecnicos" });
fastify.register(equipamentosRoutes, { prefix: "/equipamentos" });
fastify.register(servicosRoutes, { prefix: "/servicos" });
fastify.register(pecasRoutes, { prefix: "/pecas" });

const start = async () => {
    try {// Inicia o servidor na porta 3000
        await fastify.listen({ port: 3000 })
    } catch (err) {
        //registra no log caso erro ao iniciar
        fastify.log.error(err)
        process.exit(1) } }
start() // Executa a função start
