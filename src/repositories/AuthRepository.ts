import { prisma } from "../../lib/prisma.js";

export class AuthRepository {
  public async findTecnicoByEmail(email: string) {
    return prisma.tecnico.findFirst({ where: { email } });
  }

  public async findClienteByEmail(email: string) {
    return prisma.cliente.findFirst({ where: { email } });
  }
}
