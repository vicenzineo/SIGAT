import { prisma } from "../../lib/prisma.js";
import type { Cliente } from "../../generated/prisma/client.js";

export class ClienteRepository {
  public async findAll(): Promise<Cliente[]> {
    return prisma.cliente.findMany();
  }

  public async findById(id: number): Promise<Cliente | null> {
    return prisma.cliente.findUnique({ where: { idCliente: id } });
  }

  public async create(data: Omit<Cliente, "idCliente">): Promise<Cliente> {
    return prisma.cliente.create({ data });
  }

  public async update(
    id: number,
    data: Partial<Omit<Cliente, "idCliente">>
  ): Promise<Cliente> {
    return prisma.cliente.update({ where: { idCliente: id }, data });
  }

  public async delete(id: number): Promise<Cliente> {
    return prisma.cliente.delete({ where: { idCliente: id } });
  }
}
