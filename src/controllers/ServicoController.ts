import type { FastifyReply, FastifyRequest } from "fastify";
import type { Servico } from "../../generated/prisma/client.js";
import { ServicoRepository } from "../repositories/ServicoRepository.js";

export class ServicoController {
  private servicoRepository = new ServicoRepository();

  post = async (
    request: FastifyRequest<{ Body: Omit<Servico, "idServico"> }>,
    reply: FastifyReply
  ) => {
    const servico = request.body;
    const json = await this.servicoRepository.create(servico);
    reply.status(201).send(json);
  };

  get = async (_request: FastifyRequest, reply: FastifyReply) => {
    const json = await this.servicoRepository.findAll();
    reply.status(200).send(json);
  };

  getParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const json = await this.servicoRepository.findById(parseInt(id, 10));

    if (json) {
      reply.status(200).send(json);
      return;
    }

    reply.status(404).send({ message: "Servico not found" });
  };

  putParamId = async (
    request: FastifyRequest<{
      Params: { id: string };
      Body: Omit<Servico, "idServico">;
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const { descricao, valorBase, ordemServicoId } = request.body;

    try {
      const json = await this.servicoRepository.update(parseInt(id, 10), {
        descricao,
        valorBase,
        ordemServicoId,
      });
      reply.status(200).send(json);
    } catch {
      reply.status(404).send({ message: "Servico not found" });
    }
  };

  deleteParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    try {
      const json = await this.servicoRepository.delete(parseInt(id, 10));
      reply.status(200).send(json);
    } catch {
      reply.status(404).send({ message: "Servico not found" });
    }
  };
}

export const servicoController = new ServicoController();
