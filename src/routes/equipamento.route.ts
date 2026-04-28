import type { FastifyInstance } from "fastify";
import { equipamentoController } from "../controllers/EquipamentoController.js";
import {
  deleteEquipamentoByIdSchema,
  getEquipamentoByIdSchema,
  getEquipamentoSchema,
  postEquipamentoSchema,
  putEquipamentoByIdSchema,
} from "../schemas/equipamento.schema.js";

async function equipamentosRoutes(fastify: FastifyInstance) {
  fastify.get("/", getEquipamentoSchema, equipamentoController.get);
  fastify.get("/:id", getEquipamentoByIdSchema, equipamentoController.getParamId);
  fastify.post("/", postEquipamentoSchema, equipamentoController.post);
  fastify.put("/:id", putEquipamentoByIdSchema, equipamentoController.putParamId);
  fastify.delete("/:id", deleteEquipamentoByIdSchema, equipamentoController.deleteParamId);
}

export default equipamentosRoutes;
