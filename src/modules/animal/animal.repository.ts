import {prisma} from "../../config/prisma";
import {Animal} from "@prisma/client";

export const animalRepository = {
  create: (data: Omit<Animal, "id" | "dataCadastro" | "dataAtualizacao">) => {
    return prisma.animal.create({ data });
  },

  findManyPaginated: (skip: number, take: number): Promise<Animal[]> => {
    return prisma.animal.findMany({
      skip: skip,
      take: take,
      orderBy: {
        id: "desc", // Ou outra ordenação desejada
      },
      // where: {} // Adicione filtros aqui se necessário
    });
  },
    
  countAll: (): Promise<number> => {
    // where: {} // Adicione os mesmos filtros do findManyPaginated se houver
    return prisma.animal.count();
  },

    findById: (id: bigint): Promise<Animal | null> => {
        return prisma.animal.findUnique({where: {id}});
    },

    findByProprietario: (idProprietario: bigint | null): Promise<Animal[]> => {
        if (idProprietario === null) return Promise.resolve([]);
        return prisma.animal.findMany({where: {idProprietario}});
    },

    findByFazenda: (idFazenda: bigint): Promise<Animal[]> => {
        return prisma.animal.findMany({where: {idFazenda}});
    },

    findByNumeroParticularAndProprietario: (
        numeroParticularProprietario: string | null,
        idProprietario: bigint | null
    ): Promise<Animal | null> => {
        if (!numeroParticularProprietario || !idProprietario) return Promise.resolve(null);
        return prisma.animal.findFirst({
            where: {numeroParticularProprietario, idProprietario}
        });
    },

    update: (id: bigint, data: Partial<Animal>) => {
        return prisma.animal.update({where: {id}, data});
    },

    delete: (id: bigint) => {
        return prisma.animal.delete({where: {id}});
    },

    findByIdWithRelations(bigint: bigint, relation: string) {
        const includeOptions: any = {};
        if (relation === 'pais') {
            includeOptions.pai = {
                include: { pai: true, mae: true }
            }
            includeOptions.mae = {
                include: { pai: true, mae: true }
            }
        } else if (relation === 'filhos') {
            includeOptions.filhosComoMae = {
                include: { pai: true, mae: true }
            }
            includeOptions.filhosComoPai = {
                include: { pai: true, mae: true }
            }
        } else if (relation === 'vacinacoes') {
            includeOptions.vacinacoes = {
                include: {
                    tipoVacina: true
                }
            }
        } else {
            throw new Error("Relação inválida");
        }

        return prisma.animal.findUnique({
            where: {id: bigint},
            include: includeOptions
        });
    }

    return prisma.animal.findUnique({
      where: { id: bigint },
      include: includeOptions,
    });
  },
};
