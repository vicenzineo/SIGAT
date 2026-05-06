import { prisma } from "../../lib/prisma.js";
import type { OrdemServico } from "../../generated/prisma/client.js";

export class OrdemServicoRepository {
  public async findAll(): Promise<OrdemServico[]> {
    return prisma.ordemServico.findMany();
  }

  public async findById(id: number): Promise<OrdemServico | null> {
    return prisma.ordemServico.findUnique({ where: { idOS: id } });
  }

  public async create(data: Omit<OrdemServico, "idOS">): Promise<OrdemServico> {
    return prisma.ordemServico.create({ data });
  }

  public async update(
    id: number,
    data: Partial<Omit<OrdemServico, "idOS">>
  ): Promise<OrdemServico> {
    return prisma.ordemServico.update({ where: { idOS: id }, data });
  }

  public async delete(id: number): Promise<OrdemServico> {
    return prisma.ordemServico.delete({ where: { idOS: id } });
  }
}
