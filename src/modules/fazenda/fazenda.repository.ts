import {prisma} from "../../config/prisma";
import {Fazenda} from "@prisma/client";

export const fazendaRepository = {
    create: (data: Omit<Fazenda, "id" | "dataCadastro" | "dataAtualizacao">) => {
        return prisma.fazenda.create({ data });
    },
    findAll: prisma.fazenda.findMany(),
    findById: (id: bigint): Promise<Fazenda | null> => {
        return prisma.fazenda.findUnique({where: {id}});
    },
    findByNome: (nome: string): Promise<Fazenda | null> => {
        return prisma.fazenda.findFirst({where: {nome}});
    },
    findByNomeAndIdProprietario: (nome: string, idProprietario: bigint): Promise<Fazenda | null> => {
        return prisma.fazenda.findFirst({where: {nome, idProprietario: idProprietario}});
    },
    findByIdProprietario: (idProprietario: bigint): Promise<Fazenda[] | null> => {
        return prisma.fazenda.findMany({where: {idProprietario}});
    },
    update: (id: bigint, data: Partial<Fazenda>) => {
        prisma.fazenda.update({where: {id}, data})
    },
    delete: (id: bigint) => {
        prisma.fazenda.delete({where: {id}})
    }
}