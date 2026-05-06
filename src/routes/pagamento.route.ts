import type { FastifyInstance } from "fastify";
import { pagamentoController } from "../controllers/PagamentoController.js";
import {
  deletePagamentoByIdSchema,
  getPagamentoByIdSchema,
  getPagamentoSchema,
  postPagamentoSchema,
  putPagamentoByIdSchema,
} from "../schemas/pagamento.schema.js";

async function pagamentosRoutes(fastify: FastifyInstance) {
  fastify.get("/", getPagamentoSchema, pagamentoController.get);
  fastify.get("/:id", getPagamentoByIdSchema, pagamentoController.getParamId);
  fastify.post("/", postPagamentoSchema, pagamentoController.post);
  fastify.put("/:id", putPagamentoByIdSchema, pagamentoController.putParamId);
  fastify.delete("/:id", deletePagamentoByIdSchema, pagamentoController.deleteParamId);
}

export default pagamentosRoutes;
