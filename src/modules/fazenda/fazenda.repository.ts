import { prisma } from "../../config/prisma";
import { Fazenda } from "@prisma/client";

export const fazendaRepository = {
    create: (data: Omit<Fazenda, "id" | "dataCadastro" | "dataAtualizacao">) => {
        const { nome, endereco, cidade, estado, pais, porte, afixo, prefixo, sufixo, idProprietario } = data;

        return prisma.fazenda.create({
            data: {
                nome,
                endereco,
                cidade,
                estado,
                pais,
                porte,
                afixo,
                prefixo,
                sufixo,
                idProprietario
            }
        });
    },

    findAll: () => prisma.fazenda.findMany(),

    findById: (id: bigint): Promise<Fazenda | null> => {
        return prisma.fazenda.findUnique({ where: { id } });
    },

    findByNome: (nome: string): Promise<Fazenda | null> => {
        return prisma.fazenda.findFirst({ where: { nome } });
    },

    findByNomeAndIdProprietario: (nome: string, idProprietario: bigint): Promise<Fazenda | null> => {
        return prisma.fazenda.findFirst({ where: { nome, idProprietario } });
    },

    findByIdProprietario: (idProprietario: bigint): Promise<Fazenda[] | null> => {
        return prisma.fazenda.findMany({ where: { idProprietario } });
    },

    update: (id: bigint, data: Partial<Fazenda>) => {
        return prisma.fazenda.update({ where: { id }, data });
    },

    delete: (id: bigint) => {
        return prisma.fazenda.delete({ where: { id } });
    }
};
