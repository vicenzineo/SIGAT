import type { FastifyInstance } from "fastify";
import { notificacaoController } from "../controllers/NotificacaoController.js";
import {
  deleteNotificacaoByIdSchema,
  getNotificacaoByIdSchema,
  getNotificacaoSchema,
  postNotificacaoSchema,
  putNotificacaoByIdSchema,
} from "../schemas/notificacao.schema.js";

async function notificacoesRoutes(fastify: FastifyInstance) {
  fastify.get("/", getNotificacaoSchema, notificacaoController.get);
  fastify.get("/:id", getNotificacaoByIdSchema, notificacaoController.getParamId);
  fastify.post("/", postNotificacaoSchema, notificacaoController.post);
  fastify.put("/:id", putNotificacaoByIdSchema, notificacaoController.putParamId);
  fastify.delete("/:id", deleteNotificacaoByIdSchema, notificacaoController.deleteParamId);
}

export default notificacoesRoutes;
