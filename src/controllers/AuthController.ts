import type { FastifyReply, FastifyRequest } from "fastify";
import argon2 from "argon2";
import { AuthRepository } from "../repositories/AuthRepository.js";

type LoginBody = {
  nome: string;
  senha: string;
};

type LoginClienteBody = {
  email: string;
  senha: string;
};

export class AuthController {
  private authRepository = new AuthRepository();

  loginTecnico = async (
    request: FastifyRequest<{ Body: LoginBody }>,
    reply: FastifyReply
  ) => {
    const { nome, senha } = request.body;
    const tecnico = await this.authRepository.findTecnicoByNome(nome);

    if (!tecnico || !(await argon2.verify(tecnico.senha, senha))) {
      reply.status(401).send({ message: "Credenciais invalidas" });
      return;
    }

    const token = await reply.jwtSign({
      idTecnico: tecnico.idTecnico,
      nome: tecnico.nome,
    });

    reply.status(200).send({ token });
  };

  loginCliente = async (
    request: FastifyRequest<{ Body: LoginClienteBody }>,
    reply: FastifyReply
  ) => {
    const { email, senha } = request.body;
    const cliente = await this.authRepository.findClienteByEmail(email);

    if (!cliente || !(await argon2.verify(cliente.senha, senha))) {
      reply.status(401).send({ message: "Credenciais invalidas" });
      return;
    }

    const token = await reply.jwtSign({
      idCliente: cliente.idCliente,
      nome: cliente.nome,
      tipo: "cliente",
    });

    reply.status(200).send({ token });
  };
}

export const authController = new AuthController();
