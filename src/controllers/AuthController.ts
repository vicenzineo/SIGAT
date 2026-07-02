import type { FastifyReply, FastifyRequest } from "fastify";
import argon2 from "argon2";
import { AuthRepository } from "../repositories/AuthRepository.js";

type LoginBody = {
  email: string;
  senha: string;
};

type LoginClienteBody = {
  email: string;
  senha: string;
};

export class AuthController {
  private authRepository = new AuthRepository();

  private async isPasswordValid(storedPassword: string, providedPassword: string) {
    if (!storedPassword) {
      return false;
    }

    if (storedPassword.startsWith("$argon2")) {
      return argon2.verify(storedPassword, providedPassword);
    }

    return storedPassword === providedPassword;
  }

  loginTecnico = async (
    request: FastifyRequest<{ Body: LoginBody }>,
    reply: FastifyReply
  ) => {
    const { email, senha } = request.body;
    const tecnico = await this.authRepository.findTecnicoByEmail(email);

    if (!tecnico || !(await this.isPasswordValid(tecnico.senha, senha))) {
      reply.status(401).send({ message: "Credenciais invalidas" });
      return;
    }

    const token = await reply.jwtSign({
      idTecnico: tecnico.idTecnico,
      nome: tecnico.nome,
      tipo: "tecnico",
    });

    reply.status(200).send({ token });
  };

  loginCliente = async (
    request: FastifyRequest<{ Body: LoginClienteBody }>,
    reply: FastifyReply
  ) => {
    const { email, senha } = request.body;
    const cliente = await this.authRepository.findClienteByEmail(email);

    if (!cliente || !(await this.isPasswordValid(cliente.senha, senha))) {
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
