import { prisma } from "../../lib/prisma.js";
import type { Pagamento } from "../../generated/prisma/client.js";

export class PagamentoRepository {
  public async findAll(): Promise<Pagamento[]> {
    return prisma.pagamento.findMany();
  }

  public async findById(id: number): Promise<Pagamento | null> {
    return prisma.pagamento.findUnique({ where: { idPagamento: id } });
  }

  public async create(data: Omit<Pagamento, "idPagamento">): Promise<Pagamento> {
    return prisma.pagamento.create({ data });
  }

  public async update(
    id: number,
    data: Partial<Omit<Pagamento, "idPagamento">>
  ): Promise<Pagamento> {
    return prisma.pagamento.update({ where: { idPagamento: id }, data });
  }

  public async delete(id: number): Promise<Pagamento> {
    return prisma.pagamento.delete({ where: { idPagamento: id } });
  }
}
