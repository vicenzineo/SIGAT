import argon2 from "argon2";
import { prisma } from "../lib/prisma.js";

async function main() {
  console.log("Iniciando seed...");

  // Limpa apenas as tabelas sem dependencias para permitir reexecucao do seed.
  await prisma.cliente.deleteMany();
  await prisma.tecnico.deleteMany();

  const senhaPadrao = await argon2.hash("123456");

  await prisma.cliente.createMany({
    data: [
      {
        nome: "Ana Paula",
        telefone: "11999990001",
        email: "ana.paula@exemplo.com",
        senha: senhaPadrao,
      },
      {
        nome: "Bruno Silva",
        telefone: "11999990002",
        email: "bruno.silva@exemplo.com",
        senha: senhaPadrao,
      },
    ],
  });

  await prisma.tecnico.createMany({
    data: [
      {
        nome: "Carlos Souza",
        email: "carlos.souza@sigat.com",
        especialidade: "Smartphone",
        telefone: "11988880001",
        senha: senhaPadrao,
      },
      {
        nome: "Daniela Lima",
        email: "daniela.lima@sigat.com",
        especialidade: "Notebook",
        telefone: "11988880002",
        senha: senhaPadrao,
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
