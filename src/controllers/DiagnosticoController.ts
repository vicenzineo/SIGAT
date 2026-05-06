import type { FastifyReply, FastifyRequest } from "fastify";
import type { Diagnostico } from "../../generated/prisma/client.js";
import { DiagnosticoRepository } from "../repositories/DiagnosticoRepository.js";

export class DiagnosticoController {
  private diagnosticoRepository = new DiagnosticoRepository();

  post = async (
    request: FastifyRequest<{ Body: Omit<Diagnostico, "idDiagnostico"> }>,
    reply: FastifyReply
  ) => {
    const diagnostico = request.body;
    const json = await this.diagnosticoRepository.create(diagnostico);
    reply.status(201).send(json);
  };

  get = async (_request: FastifyRequest, reply: FastifyReply) => {
    const json = await this.diagnosticoRepository.findAll();
    reply.status(200).send(json);
  };

  getParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const json = await this.diagnosticoRepository.findById(parseInt(id, 10));

    if (json) {
      reply.status(200).send(json);
      return;
    }

    reply.status(404).send({ message: "Diagnostico not found" });
  };

  putParamId = async (
    request: FastifyRequest<{
      Params: { id: string };
      Body: Omit<Diagnostico, "idDiagnostico">;
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const { descricao, dataRegistro, ordemServicoId } = request.body;

    try {
      const json = await this.diagnosticoRepository.update(parseInt(id, 10), {
        descricao,
        dataRegistro,
        ordemServicoId,
      });
      reply.status(200).send(json);
    } catch {
      reply.status(404).send({ message: "Diagnostico not found" });
    }
  };

  deleteParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    try {
      const json = await this.diagnosticoRepository.delete(parseInt(id, 10));
      reply.status(200).send(json);
    } catch {
      reply.status(404).send({ message: "Diagnostico not found" });
    }
  };
}

export const diagnosticoController = new DiagnosticoController();
