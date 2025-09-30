import { prisma } from "../../config/prisma";
import { Animal } from "@prisma/client";

export const animalRepository = {
    create: (data: Omit<Animal, "id" | "dataCadastro" | "dataAtualizacao">) => {
        return prisma.animal.create({ data });
    },

    findAll: (): Promise<Animal[]> => {
        return prisma.animal.findMany();
    },

    findById: (id: bigint): Promise<Animal | null> => {
        return prisma.animal.findUnique({ where: { id } });
    },

    findByProprietario: (idProprietario: bigint): Promise<Animal[]> => {
        return prisma.animal.findMany({ where: { idProprietario } });
    },

    findByFazenda: (idFazenda: bigint): Promise<Animal[]> => {
        return prisma.animal.findMany({ where: { idFazenda } });
    },

    findByNumeroParticularAndProprietario: (
        numeroParticularProprietario: string,
        idProprietario: bigint
    ): Promise<Animal | null> => {
        return prisma.animal.findFirst({
            where: { numeroParticularProprietario, idProprietario }
        });
    },

    update: (id: bigint, data: Partial<Animal>) => {
        return prisma.animal.update({ where: { id }, data });
    },

    delete: (id: bigint) => {
        return prisma.animal.delete({ where: { id } });
    }
};
