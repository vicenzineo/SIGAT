import type { FastifyInstance } from "fastify";
import { ordemServicoController } from "../controllers/OrdemServicoController.js";
import {
  deleteOrdemServicoByIdSchema,
  getOrdemServicoByIdSchema,
  getOrdemServicoSchema,
  postOrdemServicoSchema,
  putOrdemServicoByIdSchema,
} from "../schemas/ordemServico.schema.js";

async function ordensServicoRoutes(fastify: FastifyInstance) {
  fastify.get("/", getOrdemServicoSchema, ordemServicoController.get);
  fastify.get("/:id", getOrdemServicoByIdSchema, ordemServicoController.getParamId);
  fastify.post("/", postOrdemServicoSchema, ordemServicoController.post);
  fastify.put("/:id", putOrdemServicoByIdSchema, ordemServicoController.putParamId);
  fastify.delete("/:id", deleteOrdemServicoByIdSchema, ordemServicoController.deleteParamId);
}

export default ordensServicoRoutes;
