import { prisma } from "../../lib/prisma.js";
import type { ItemPecoOS } from "../../generated/prisma/client.js";

export class ItemPecoOSNotFoundError extends Error {
  constructor() {
    super("ITEM_PECA_OS_NOT_FOUND");
  }
}

export class PecaNotFoundError extends Error {
  constructor() {
    super("PECA_NOT_FOUND");
  }
}

export class InsufficientStockError extends Error {
  constructor(public readonly available: number, public readonly requested: number) {
    super("INSUFFICIENT_STOCK");
  }
}

export class ItemPecoOSRepository {
  public async findAll(): Promise<ItemPecoOS[]> {
    return prisma.itemPecoOS.findMany();
  }

  public async findById(id: number): Promise<ItemPecoOS | null> {
    return prisma.itemPecoOS.findUnique({ where: { idItemPecaOS: id } });
  }

  public async create(
    data: Omit<ItemPecoOS, "idItemPecaOS">
  ): Promise<ItemPecoOS> {
    return prisma.$transaction(async (tx) => {
      const peca = await tx.peca.findUnique({ where: { idPeca: data.pecaId } });

      if (!peca) {
        throw new PecaNotFoundError();
      }

      if (peca.quantidadeEstoque < data.quantidade) {
        throw new InsufficientStockError(peca.quantidadeEstoque, data.quantidade);
      }

      const item = await tx.itemPecoOS.create({ data });

      await tx.peca.update({
        where: { idPeca: data.pecaId },
        data: { quantidadeEstoque: { decrement: data.quantidade } },
      });

      return item;
    });
  }

  public async update(
    id: number,
    data: Partial<Omit<ItemPecoOS, "idItemPecaOS">>
  ): Promise<ItemPecoOS> {
    return prisma.$transaction(async (tx) => {
      const currentItem = await tx.itemPecoOS.findUnique({ where: { idItemPecaOS: id } });

      if (!currentItem) {
        throw new ItemPecoOSNotFoundError();
      }

      const nextQuantidade = data.quantidade ?? currentItem.quantidade;
      const nextOrdemServicoId = data.ordemServicoId ?? currentItem.ordemServicoId;
      const nextPecaId = data.pecaId ?? currentItem.pecaId;

      if (nextPecaId !== currentItem.pecaId) {
        const nextPeca = await tx.peca.findUnique({ where: { idPeca: nextPecaId } });

        if (!nextPeca) {
          throw new PecaNotFoundError();
        }

        if (nextPeca.quantidadeEstoque < nextQuantidade) {
          throw new InsufficientStockError(nextPeca.quantidadeEstoque, nextQuantidade);
        }

        await tx.peca.update({
          where: { idPeca: currentItem.pecaId },
          data: { quantidadeEstoque: { increment: currentItem.quantidade } },
        });

        await tx.peca.update({
          where: { idPeca: nextPecaId },
          data: { quantidadeEstoque: { decrement: nextQuantidade } },
        });
      } else {
        const delta = nextQuantidade - currentItem.quantidade;
        if (delta > 0) {
          const peca = await tx.peca.findUnique({ where: { idPeca: currentItem.pecaId } });

          if (!peca) {
            throw new PecaNotFoundError();
          }

          if (peca.quantidadeEstoque < delta) {
            throw new InsufficientStockError(peca.quantidadeEstoque, delta);
          }

          await tx.peca.update({
            where: { idPeca: currentItem.pecaId },
            data: { quantidadeEstoque: { decrement: delta } },
          });
        } else if (delta < 0) {
          await tx.peca.update({
            where: { idPeca: currentItem.pecaId },
            data: { quantidadeEstoque: { increment: Math.abs(delta) } },
          });
        }
      }

      return tx.itemPecoOS.update({
        where: { idItemPecaOS: id },
        data: {
          quantidade: nextQuantidade,
          ordemServicoId: nextOrdemServicoId,
          pecaId: nextPecaId,
        },
      });
    });
  }

  public async delete(id: number): Promise<ItemPecoOS> {
    return prisma.$transaction(async (tx) => {
      const item = await tx.itemPecoOS.findUnique({ where: { idItemPecaOS: id } });

      if (!item) {
        throw new ItemPecoOSNotFoundError();
      }

      const deletedItem = await tx.itemPecoOS.delete({ where: { idItemPecaOS: id } });

      await tx.peca.update({
        where: { idPeca: item.pecaId },
        data: { quantidadeEstoque: { increment: item.quantidade } },
      });

      return deletedItem;
    });
  }
}
