// src/modules/doencaAnimal/doencaAnimal.repository.ts
import { prisma as prismaClient } from "../../config/prisma";

const prisma = prismaClient as any;

export class DoencaAnimalRepository {
  async findById(id: bigint) {
    return prisma.doencaAnimal.findUnique({
      where: { id },
      include: {
        doenca: true,
        animal: true,
      },
    });
  }

  async findByAnimal(idAnimal: bigint) {
    return prisma.doencaAnimal.findMany({
      where: { idAnimal },
      include: {
        doenca: true,
      },
      orderBy: {
        dataDiagnostico: "desc",
      },
    });
  }

  async create(data: {
    idAnimal: bigint;
    idDoenca: bigint;
    dataDiagnostico: Date;
    emTratamento: boolean;
    dataFimTratamento?: Date | null;
    observacoes?: string | null;
  }) {
    return prisma.doencaAnimal.create({
      data: {
        idAnimal: data.idAnimal,
        idDoenca: data.idDoenca,
        dataDiagnostico: data.dataDiagnostico,
        emTratamento: data.emTratamento,
        dataFimTratamento: data.dataFimTratamento ?? null,
        observacoes: data.observacoes ?? null,
      },
      include: {
        doenca: true,
      },
    });
  }

  async update(
    id: bigint,
    data: {
      dataDiagnostico?: Date;
      emTratamento?: boolean;
      dataFimTratamento?: Date | null;
      observacoes?: string | null;
    }
  ) {
    return prisma.doencaAnimal.update({
      where: { id },
      data,
      include: {
        doenca: true,
      },
    });
  }

  async delete(id: bigint) {
    await prisma.doencaAnimal.delete({
      where: { id },
    });
  }
}

export const doencaAnimalRepository = new DoencaAnimalRepository();
