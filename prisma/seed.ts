import { prisma } from "../lib/prisma.js";

async function main() {
  console.log("Iniciando seed...");

  // Limpa apenas as tabelas sem dependencias para permitir reexecucao do seed.
  await prisma.cliente.deleteMany();
  await prisma.tecnico.deleteMany();

  await prisma.cliente.createMany({
    data: [
      {
        nome: "Ana Paula",
        telefone: "11999990001",
        email: "ana.paula@exemplo.com",
      },
      {
        nome: "Bruno Silva",
        telefone: "11999990002",
        email: "bruno.silva@exemplo.com",
      },
    ],
  });

  await prisma.tecnico.createMany({
    data: [
      {
        nome: "Carlos Souza",
        especialidade: "Smartphone",
        telefone: "11988880001",
      },
      {
        nome: "Daniela Lima",
        especialidade: "Notebook",
        telefone: "11988880002",
      },
    ],
  });

  console.log("Seed concluido com sucesso.");
}

main()
  .catch((error) => {
    console.error("Erro ao executar seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
