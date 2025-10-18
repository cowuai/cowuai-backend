import { prisma } from "../../config/prisma";
import { Animal } from "@prisma/client";

export const animalRepository = {
  create: (data: Omit<Animal, "id" | "dataCadastro" | "dataAtualizacao">) => {
    return prisma.animal.create({ data });
  }, // =========================================================

  // NOVO: 1. Método para busca paginada
  // Utiliza skip (offset) e take (limit) do Prisma
  // =========================================================
  findManyPaginated: (skip: number, take: number): Promise<Animal[]> => {
    return prisma.animal.findMany({
      skip: skip,
      take: take,
      orderBy: {
        // Sugestão de ordenação para resultados consistentes
        id: "desc",
      },
      // Você pode adicionar um where {} para filtros se necessário
    });
  },

  // =========================================================
  // NOVO: 2. Método para contagem total de registros
  // Essencial para calcular o total de páginas no Controller
  // =========================================================
  countAll: (): Promise<number> => {
    return prisma.animal.count();
  },

  // O método findAll original foi substituído pela lógica de paginação
  // removendo a duplicação desnecessária.

  findById: (id: bigint): Promise<Animal | null> => {
    return prisma.animal.findUnique({ where: { id } });
  },

  findByProprietario: (idProprietario: bigint | null): Promise<Animal[]> => {
    if (idProprietario === null) return Promise.resolve([]);
    return prisma.animal.findMany({ where: { idProprietario } });
  },

  findByFazenda: (idFazenda: bigint): Promise<Animal[]> => {
    return prisma.animal.findMany({ where: { idFazenda } });
  },

  findByNumeroParticularAndProprietario: (
    numeroParticularProprietario: string | null,
    idProprietario: bigint | null
  ): Promise<Animal | null> => {
    if (!numeroParticularProprietario || !idProprietario)
      return Promise.resolve(null);
    return prisma.animal.findFirst({
      where: { numeroParticularProprietario, idProprietario },
    });
  },

  update: (id: bigint, data: Partial<Animal>) => {
    return prisma.animal.update({ where: { id }, data });
  },

  delete: (id: bigint) => {
    return prisma.animal.delete({ where: { id } });
  },
};
