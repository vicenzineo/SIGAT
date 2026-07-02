import { prisma } from "../../lib/prisma.js";
import type { Cliente } from "../../generated/prisma/client.js";

export class ClienteNotFoundError extends Error {
  constructor() {
    super("CLIENTE_NOT_FOUND");
  }
}

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
    return prisma.$transaction(async (tx) => {
      const cliente = await tx.cliente.findUnique({ where: { idCliente: id } });

      if (!cliente) {
        throw new ClienteNotFoundError();
      }

      const equipamentos = await tx.equipamento.findMany({
        where: { clienteId: id },
        select: { idEquipamento: true },
      });

      const equipamentoIds = equipamentos.map((equipamento) => equipamento.idEquipamento);

      if (equipamentoIds.length > 0) {
        const ordensServico = await tx.ordemServico.findMany({
          where: { equipamentoId: { in: equipamentoIds } },
          select: { idOS: true },
        });

        const ordemIds = ordensServico.map((ordem) => ordem.idOS);

        if (ordemIds.length > 0) {
          await tx.pagamento.deleteMany({ where: { ordemServicoId: { in: ordemIds } } });
          await tx.notificacao.deleteMany({ where: { ordemServicoId: { in: ordemIds } } });
          await tx.diagnostico.deleteMany({ where: { ordemServicoId: { in: ordemIds } } });
          await tx.itemPecoOS.deleteMany({ where: { ordemServicoId: { in: ordemIds } } });
          await tx.servico.deleteMany({ where: { ordemServicoId: { in: ordemIds } } });
          await tx.ordemServico.deleteMany({ where: { idOS: { in: ordemIds } } });
        }

        await tx.equipamento.deleteMany({ where: { idEquipamento: { in: equipamentoIds } } });
      }

      await tx.cliente.delete({ where: { idCliente: id } });

      return cliente;
    });
  }
}
