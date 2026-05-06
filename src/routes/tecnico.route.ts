import type { FastifyInstance } from "fastify";
import { tecnicoController } from "../controllers/TecnicoController.js";
import {
  deleteTecnicoByIdSchema,
  getTecnicoByIdSchema,
  getTecnicoSchema,
  postTecnicoSchema,
  putTecnicoByIdSchema,
} from "../schemas/tecnico.schema.js";

async function tecnicosPublicRoutes(fastify: FastifyInstance) {
  fastify.post("/", postTecnicoSchema, tecnicoController.post);
}

async function tecnicosProtectedRoutes(fastify: FastifyInstance) {
  fastify.get("/", getTecnicoSchema, tecnicoController.get);
  fastify.get("/:id", getTecnicoByIdSchema, tecnicoController.getParamId);
  fastify.put("/:id", putTecnicoByIdSchema, tecnicoController.putParamId);
  fastify.delete("/:id", deleteTecnicoByIdSchema, tecnicoController.deleteParamId);
}

export { tecnicosPublicRoutes, tecnicosProtectedRoutes };
