import { prisma } from "../../lib/prisma.js";

export class AuthRepository {
  public async findTecnicoByNome(nome: string) {
    return prisma.tecnico.findFirst({ where: { nome } });
  }

  public async findClienteByEmail(email: string) {
    return prisma.cliente.findFirst({ where: { email } });
  }
}
