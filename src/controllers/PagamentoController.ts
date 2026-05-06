import type { FastifyReply, FastifyRequest } from "fastify";
import type { Pagamento } from "../../generated/prisma/client.js";
import { PagamentoRepository } from "../repositories/PagamentoRepository.js";

export class PagamentoController {
  private pagamentoRepository = new PagamentoRepository();

  post = async (
    request: FastifyRequest<{ Body: Omit<Pagamento, "idPagamento"> }>,
    reply: FastifyReply
  ) => {
    const pagamento = request.body;
    const json = await this.pagamentoRepository.create(pagamento);
    reply.status(201).send(json);
  };

  get = async (_request: FastifyRequest, reply: FastifyReply) => {
    const json = await this.pagamentoRepository.findAll();
    reply.status(200).send(json);
  };

  getParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const json = await this.pagamentoRepository.findById(parseInt(id, 10));

    if (json) {
      reply.status(200).send(json);
      return;
    }

    reply.status(404).send({ message: "Pagamento not found" });
  };

  putParamId = async (
    request: FastifyRequest<{
      Params: { id: string };
      Body: Omit<Pagamento, "idPagamento">;
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const { valor, dataPagamento, metodo, status, ordemServicoId } = request.body;

    try {
      const json = await this.pagamentoRepository.update(parseInt(id, 10), {
        valor,
        dataPagamento,
        metodo,
        status,
        ordemServicoId,
      });
      reply.status(200).send(json);
    } catch {
      reply.status(404).send({ message: "Pagamento not found" });
    }
  };

  deleteParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    try {
      const json = await this.pagamentoRepository.delete(parseInt(id, 10));
      reply.status(200).send(json);
    } catch {
      reply.status(404).send({ message: "Pagamento not found" });
    }
  };
}

export const pagamentoController = new PagamentoController();
