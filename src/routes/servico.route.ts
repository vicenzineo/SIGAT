import type { FastifyInstance } from "fastify";
import { servicoController } from "../controllers/ServicoController.js";
import {
  deleteServicoByIdSchema,
  getServicoByIdSchema,
  getServicoSchema,
  postServicoSchema,
  putServicoByIdSchema,
} from "../schemas/servico.schema.js";

async function servicosRoutes(fastify: FastifyInstance) {
  fastify.get("/", getServicoSchema, servicoController.get);
  fastify.get("/:id", getServicoByIdSchema, servicoController.getParamId);
  fastify.post("/", postServicoSchema, servicoController.post);
  fastify.put("/:id", putServicoByIdSchema, servicoController.putParamId);
  fastify.delete("/:id", deleteServicoByIdSchema, servicoController.deleteParamId);
}

export default servicosRoutes;
