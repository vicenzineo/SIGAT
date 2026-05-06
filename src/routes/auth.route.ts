import type { FastifyInstance } from "fastify";
import { authController } from "../controllers/AuthController.js";
import {
  postAuthLoginClienteSchema,
  postAuthLoginTecnicoSchema,
} from "../schemas/auth.schema.js";

async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/login/tecnico", postAuthLoginTecnicoSchema, authController.loginTecnico);
  fastify.post("/login/cliente", postAuthLoginClienteSchema, authController.loginCliente);
}

export default authRoutes;
