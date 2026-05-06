import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import authRoutes from "./routes/auth.route.js";
import { clientesPublicRoutes, clientesProtectedRoutes } from "./routes/cliente.route.js";
import { tecnicosPublicRoutes, tecnicosProtectedRoutes } from "./routes/tecnico.route.js";
import equipamentosRoutes from "./routes/equipamento.route.js";
import servicosRoutes from "./routes/servico.route.js";
import pecasRoutes from "./routes/peca.route.js";
import ordensServicoRoutes from "./routes/ordemServico.route.js";
import pagamentosRoutes from "./routes/pagamento.route.js";
import notificacoesRoutes from "./routes/notificacao.route.js";
import diagnosticosRoutes from "./routes/diagnostico.route.js";
import itensPecoOSRoutes from "./routes/itemPecoOS.route.js";

const fastify = Fastify({ logger: true });
let numero = 0;

await fastify.register(cors, {
    origin: "*",
    methods: "*",
});

await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET ?? "sigat_jwt_secret",
});

await fastify.register(fastifySwagger, {
    openapi: {
        info: {
            title: "SIGAT API",
            description: "API REST para gestao de assistencia tecnica",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{ bearerAuth: [] }],
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
fastify.register(authRoutes, { prefix: "/auth" });

// Rotas públicas (sem autenticação)
fastify.register(clientesPublicRoutes, { prefix: "/clientes" });
fastify.register(tecnicosPublicRoutes, { prefix: "/tecnicos" });

// Rotas protegidas (com autenticação)
await fastify.register(async function protectedRoutes(protectedFastify) {
    protectedFastify.addHook("preHandler", authMiddleware);

    protectedFastify.register(clientesProtectedRoutes, { prefix: "/clientes" });
    protectedFastify.register(tecnicosProtectedRoutes, { prefix: "/tecnicos" });
    protectedFastify.register(equipamentosRoutes, { prefix: "/equipamentos" });
    protectedFastify.register(servicosRoutes, { prefix: "/servicos" });
    protectedFastify.register(pecasRoutes, { prefix: "/pecas" });
    protectedFastify.register(ordensServicoRoutes, { prefix: "/ordens-servico" });
    protectedFastify.register(pagamentosRoutes, { prefix: "/pagamentos" });
    protectedFastify.register(notificacoesRoutes, { prefix: "/notificacoes" });
    protectedFastify.register(diagnosticosRoutes, { prefix: "/diagnosticos" });
    protectedFastify.register(itensPecoOSRoutes, { prefix: "/itens-peca-os" });
});

const start = async () => {
    try {// Inicia o servidor na porta 3000
        await fastify.listen({ port: 3000 })
    } catch (err) {
        //registra no log caso erro ao iniciar
        fastify.log.error(err)
        process.exit(1) } }
start() // Executa a função start
