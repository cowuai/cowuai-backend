// src/modules/doenca/doenca.repository.ts
import { prisma as prismaClient } from "../../config/prisma";

const prisma = prismaClient as any;

export class DoencaRepository {
  async findAll() {
    return prisma.doenca.findMany({
      orderBy: { nome: "asc" },
    });
  }

  async findById(id: bigint) {
    return prisma.doenca.findUnique({
      where: { id },
    });
  }

  async findByNome(nome: string) {
    return prisma.doenca.findFirst({
      where: { nome },
    });
  }

  async create(data: {
    nome: string;
    descricao?: string | null;
    ehCronica?: boolean;
  }) {
    return prisma.doenca.create({
      data: {
        nome: data.nome,
        descricao: data.descricao ?? null,
        ehCronica: data.ehCronica ?? false,
      },
    });
  }

  async update(
    id: bigint,
    data: { nome?: string; descricao?: string | null; ehCronica?: boolean }
  ) {
    return prisma.doenca.update({
      where: { id },
      data,
    });
  }

  async delete(id: bigint) {
    await prisma.doenca.delete({
      where: { id },
    });
  }
}

export const doencaRepository = new DoencaRepository();
