import {prisma} from "../../config/prisma";
import {Fazenda} from "@prisma/client";

export const fazendaRepository = {
    create: (data: Omit<Fazenda, "id" | "dataCadastro" | "dataAtualizacao">) => {
        return prisma.fazenda.create({
            data: {
                proprietario: {
                    connect: {
                        id: data.idProprietario
                    }
                },
                nome: data.nome,
                endereco: data.endereco,
                cidade: data.cidade,
                estado: data.estado,
                pais: data.pais,
                porte: data.porte,
                afixo: data.afixo,
                prefixo: data.prefixo,
                sufixo: data.sufixo,
            }
        });
    },

    findAll: () => prisma.fazenda.findMany(),

    findById: (id: bigint): Promise<Fazenda | null> => {
        return prisma.fazenda.findUnique({where: {id}});
    },

    findByNome: (nome: string): Promise<Fazenda | null> => {
        return prisma.fazenda.findFirst({where: {nome}});
    },

    findByNomeAndIdProprietario: (nome: string, idProprietario: bigint): Promise<Fazenda | null> => {
        return prisma.fazenda.findFirst({where: {nome, idProprietario}});
    },

    findByIdProprietario: (idProprietario: bigint): Promise<Fazenda[] | null> => {
        return prisma.fazenda.findMany({where: {idProprietario}});
    },

    update: (id: bigint, data: Partial<Fazenda>) => {
        return prisma.fazenda.update({where: {id}, data});
    },

    delete: (id: bigint) => {
        return prisma.fazenda.delete({where: {id}});
    },

    countFarmsByUserId(userId: bigint) {
        return prisma.fazenda.count({
            where: {idProprietario: userId}
        })
    }
};
