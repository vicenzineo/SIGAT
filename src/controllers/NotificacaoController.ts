import type { FastifyReply, FastifyRequest } from "fastify";
import type { Notificacao } from "../../generated/prisma/client.js";
import { NotificacaoRepository } from "../repositories/NotificacaoRepository.js";

export class NotificacaoController {
  private notificacaoRepository = new NotificacaoRepository();

  post = async (
    request: FastifyRequest<{ Body: Omit<Notificacao, "idNotificacao"> }>,
    reply: FastifyReply
  ) => {
    const notificacao = request.body;
    const json = await this.notificacaoRepository.create(notificacao);
    reply.status(201).send(json);
  };

  get = async (_request: FastifyRequest, reply: FastifyReply) => {
    const json = await this.notificacaoRepository.findAll();
    reply.status(200).send(json);
  };

  getParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const json = await this.notificacaoRepository.findById(parseInt(id, 10));

    if (json) {
      reply.status(200).send(json);
      return;
    }

    reply.status(404).send({ message: "Notificacao not found" });
  };

  putParamId = async (
    request: FastifyRequest<{
      Params: { id: string };
      Body: Omit<Notificacao, "idNotificacao">;
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const { mensagem, dataEnvio, tipo, ordemServicoId } = request.body;

    try {
      const json = await this.notificacaoRepository.update(parseInt(id, 10), {
        mensagem,
        dataEnvio,
        tipo,
        ordemServicoId,
      });
      reply.status(200).send(json);
    } catch {
      reply.status(404).send({ message: "Notificacao not found" });
    }
  };

  deleteParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    try {
      const json = await this.notificacaoRepository.delete(parseInt(id, 10));
      reply.status(200).send(json);
    } catch {
      reply.status(404).send({ message: "Notificacao not found" });
    }
  };
}

export const notificacaoController = new NotificacaoController();
