import { prisma } from "../../config/prisma";
import { TipoVacina } from "@prisma/client";

export const tipoVacinaRepository = {
    create: (data: Omit<TipoVacina, "id" | "dataCadastro" | "dataAtualizacao">) => {
        return prisma.tipoVacina.create({ data });
    },
    findAll: () => {
        return prisma.tipoVacina.findMany();
    },
    findById: (id: bigint) => {
        return prisma.tipoVacina.findUnique({ where: { id } });
    },
    findByNome: (nome: string) => {
        return prisma.tipoVacina.findFirst({ where: { nome } });
    },
    update: (id: bigint, data: Partial<TipoVacina>) => {
        return prisma.tipoVacina.update({ where: { id }, data });
    },
    delete: (id: bigint) => {
        return prisma.tipoVacina.delete({ where: { id } });
    }
}