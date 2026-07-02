import type { FastifyReply, FastifyRequest } from "fastify";
import type { OrdemServico } from "../../generated/prisma/client.js";
import { OrdemServicoRepository } from "../repositories/OrdemServicoRepository.js";

export class OrdemServicoController {
  private ordemServicoRepository = new OrdemServicoRepository();

  private normalizeOrdemServicoPayload(payload: Partial<Omit<OrdemServico, "idOS">>) {
    const dataAbertura = payload.dataAbertura;
    const parsedDate = typeof dataAbertura === 'string' && dataAbertura.length > 0
      ? new Date(dataAbertura)
      : dataAbertura;

    return {
      ...payload,
      ...(payload.equipamentoId !== undefined ? { equipamentoId: Number(payload.equipamentoId) } : {}),
      ...(payload.tecnicoId !== undefined ? { tecnicoId: Number(payload.tecnicoId) } : {}),
      ...(payload.valorServico !== undefined ? { valorServico: Number(payload.valorServico) } : {}),
      ...(parsedDate instanceof Date && !Number.isNaN(parsedDate.getTime()) ? { dataAbertura: parsedDate } : {}),
    };
  }

  post = async (
    request: FastifyRequest<{ Body: Omit<OrdemServico, "idOS"> }>,
    reply: FastifyReply
  ) => {
    const ordemServico = this.normalizeOrdemServicoPayload(request.body);
    const json = await this.ordemServicoRepository.create({
      ...(ordemServico as Omit<OrdemServico, "idOS">),
    });
    reply.status(201).send(json);
  };

  get = async (_request: FastifyRequest, reply: FastifyReply) => {
    const json = await this.ordemServicoRepository.findAll();
    reply.status(200).send(json);
  };

  getParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const json = await this.ordemServicoRepository.findById(parseInt(id, 10));

    if (json) {
      reply.status(200).send(json);
      return;
    }

    reply.status(404).send({ message: "Ordem de servico not found" });
  };

  putParamId = async (
    request: FastifyRequest<{
      Params: { id: string };
      Body: Omit<OrdemServico, "idOS">;
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const { dataAbertura, status, valorServico, equipamentoId, tecnicoId } =
      request.body;

    try {
      const json = await this.ordemServicoRepository.update(parseInt(id, 10), {
        ...this.normalizeOrdemServicoPayload({
          dataAbertura,
          status,
          valorServico,
          equipamentoId,
          tecnicoId,
        }),
      });
      reply.status(200).send(json);
    } catch {
      reply.status(404).send({ message: "Ordem de servico not found" });
    }
  };

  deleteParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    try {
      const json = await this.ordemServicoRepository.delete(parseInt(id, 10));
      reply.status(200).send(json);
    } catch {
      reply.status(404).send({ message: "Ordem de servico not found" });
    }
  };
}

export const ordemServicoController = new OrdemServicoController();
