import type { FastifyReply, FastifyRequest } from "fastify";
import argon2 from "argon2";
import type { Cliente } from "../../generated/prisma/client.js";
import { getAuthenticatedClienteId } from "../middlewares/role.middleware.js";
import { ClienteNotFoundError, ClienteRepository } from "../repositories/ClienteRepository.js";
import { EquipamentoRepository } from "../repositories/EquipamentoRepository.js";
import { OrdemServicoRepository } from "../repositories/OrdemServicoRepository.js";

export class ClienteController {
  private clienteRepository = new ClienteRepository();
  private equipamentoRepository = new EquipamentoRepository();
  private ordemServicoRepository = new OrdemServicoRepository();

  private toPublicCliente(cliente: Cliente) {
    const { senha: _senha, ...publicCliente } = cliente;
    return publicCliente;
  }

  post = async (
    request: FastifyRequest<{ Body: Omit<Cliente, "idCliente"> }>,
    reply: FastifyReply
  ) => {
    const cliente = request.body;
    const senhaHash = await argon2.hash(cliente.senha ?? "123456");
    const json = await this.clienteRepository.create({
      ...cliente,
      senha: senhaHash,
    });
    reply.status(201).send(this.toPublicCliente(json));
  };

  get = async (_request: FastifyRequest, reply: FastifyReply) => {
    const json = await this.clienteRepository.findAll();
    reply.status(200).send(json.map((cliente) => this.toPublicCliente(cliente)));
  };

  getMe = async (request: FastifyRequest, reply: FastifyReply) => {
    const clienteId = getAuthenticatedClienteId(request);
    if (!clienteId) {
      reply.status(401).send({ message: "Token invalido" });
      return;
    }

    const json = await this.clienteRepository.findById(clienteId);

    if (!json) {
      reply.status(404).send({ message: "Cliente not found" });
      return;
    }

    reply.status(200).send(this.toPublicCliente(json));
  };

  putMe = async (
    request: FastifyRequest<{ Body: Omit<Cliente, "idCliente"> }>,
    reply: FastifyReply
  ) => {
    const clienteId = getAuthenticatedClienteId(request);
    if (!clienteId) {
      reply.status(401).send({ message: "Token invalido" });
      return;
    }

    const { nome, telefone, email, senha } = request.body;

    try {
      const senhaHash = senha ? await argon2.hash(senha) : undefined;
      const json = await this.clienteRepository.update(clienteId, {
        nome,
        telefone,
        email,
        ...(senhaHash ? { senha: senhaHash } : {}),
      });
      reply.status(200).send(this.toPublicCliente(json));
    } catch {
      reply.status(404).send({ message: "Cliente not found" });
    }
  };

  getMyEquipamentos = async (request: FastifyRequest, reply: FastifyReply) => {
    const clienteId = getAuthenticatedClienteId(request);
    if (!clienteId) {
      reply.status(401).send({ message: "Token invalido" });
      return;
    }

    const json = await this.equipamentoRepository.findByClienteId(clienteId);
    reply.status(200).send(json);
  };

  getMyOrdensServico = async (request: FastifyRequest, reply: FastifyReply) => {
    const clienteId = getAuthenticatedClienteId(request);
    if (!clienteId) {
      reply.status(401).send({ message: "Token invalido" });
      return;
    }

    const json = await this.ordemServicoRepository.findByClienteId(clienteId);
    reply.status(200).send(json);
  };

  getParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const json = await this.clienteRepository.findById(parseInt(id, 10));

    if (json) {
      reply.status(200).send(this.toPublicCliente(json));
      return;
    }

    reply.status(404).send({ message: "Cliente not found" });
  };

  putParamId = async (
    request: FastifyRequest<{
      Params: { id: string };
      Body: Omit<Cliente, "idCliente">;
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const { nome, telefone, email, senha } = request.body;

    try {
      const senhaHash = senha ? await argon2.hash(senha) : undefined;
      const json = await this.clienteRepository.update(parseInt(id, 10), {
        nome,
        telefone,
        email,
        ...(senhaHash ? { senha: senhaHash } : {}),
      });
      reply.status(200).send(this.toPublicCliente(json));
    } catch {
      reply.status(404).send({ message: "Cliente not found" });
    }
  };

  deleteParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    try {
      const json = await this.clienteRepository.delete(parseInt(id, 10));
      reply.status(200).send(this.toPublicCliente(json));
    } catch (error) {
      if (error instanceof ClienteNotFoundError) {
        reply.status(404).send({ message: "Cliente not found" });
        return;
      }

      request.log.error(error, "Erro ao excluir cliente");
      reply.status(409).send({ message: "Nao foi possivel excluir cliente com registros relacionados" });
      return;
    }
  };
}

export const clienteController = new ClienteController();
