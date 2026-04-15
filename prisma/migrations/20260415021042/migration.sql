-- CreateTable
CREATE TABLE "Cliente" (
    "idCliente" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("idCliente")
);

-- CreateTable
CREATE TABLE "Equipamento" (
    "idEquipamento" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "numeroSerie" TEXT NOT NULL,
    "defeitoRelatado" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Equipamento_pkey" PRIMARY KEY ("idEquipamento")
);

-- CreateTable
CREATE TABLE "OrdemServico" (
    "idOS" SERIAL NOT NULL,
    "dataAbertura" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "valorServico" DOUBLE PRECISION NOT NULL,
    "equipamentoId" INTEGER NOT NULL,
    "tecnicoId" INTEGER NOT NULL,

    CONSTRAINT "OrdemServico_pkey" PRIMARY KEY ("idOS")
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "idPagamento" SERIAL NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "dataPagamento" TIMESTAMP(3) NOT NULL,
    "metodo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "ordemServicoId" INTEGER NOT NULL,

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("idPagamento")
);

-- CreateTable
CREATE TABLE "Notificacao" (
    "idNotificacao" SERIAL NOT NULL,
    "mensagem" TEXT NOT NULL,
    "dataEnvio" TIMESTAMP(3) NOT NULL,
    "tipo" TEXT NOT NULL,
    "ordemServicoId" INTEGER NOT NULL,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("idNotificacao")
);

-- CreateTable
CREATE TABLE "Tecnico" (
    "idTecnico" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Tecnico_pkey" PRIMARY KEY ("idTecnico")
);

-- CreateTable
CREATE TABLE "Servico" (
    "idServico" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "valorBase" INTEGER NOT NULL,
    "ordemServicoId" INTEGER NOT NULL,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("idServico")
);

-- CreateTable
CREATE TABLE "Diagnostico" (
    "idDiagnostico" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataRegistro" TIMESTAMP(3) NOT NULL,
    "ordemServicoId" INTEGER NOT NULL,

    CONSTRAINT "Diagnostico_pkey" PRIMARY KEY ("idDiagnostico")
);

-- CreateTable
CREATE TABLE "ItemPecoOS" (
    "idItemPecaOS" SERIAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "ordemServicoId" INTEGER NOT NULL,
    "pecaId" INTEGER NOT NULL,

    CONSTRAINT "ItemPecoOS_pkey" PRIMARY KEY ("idItemPecaOS")
);

-- CreateTable
CREATE TABLE "Peca" (
    "idPeca" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "quantidadeEstoque" INTEGER NOT NULL,
    "precoUnitario" INTEGER NOT NULL,

    CONSTRAINT "Peca_pkey" PRIMARY KEY ("idPeca")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pagamento_ordemServicoId_key" ON "Pagamento"("ordemServicoId");

-- AddForeignKey
ALTER TABLE "Equipamento" ADD CONSTRAINT "Equipamento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("idCliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdemServico" ADD CONSTRAINT "OrdemServico_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "Equipamento"("idEquipamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdemServico" ADD CONSTRAINT "OrdemServico_tecnicoId_fkey" FOREIGN KEY ("tecnicoId") REFERENCES "Tecnico"("idTecnico") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "OrdemServico"("idOS") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "OrdemServico"("idOS") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servico" ADD CONSTRAINT "Servico_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "OrdemServico"("idOS") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnostico" ADD CONSTRAINT "Diagnostico_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "OrdemServico"("idOS") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPecoOS" ADD CONSTRAINT "ItemPecoOS_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "OrdemServico"("idOS") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPecoOS" ADD CONSTRAINT "ItemPecoOS_pecaId_fkey" FOREIGN KEY ("pecaId") REFERENCES "Peca"("idPeca") ON DELETE RESTRICT ON UPDATE CASCADE;
