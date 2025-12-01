import {prisma} from "../../config/prisma";
import {VacinaAplicada} from "@prisma/client";

export const aplicacaoVacinaRepository = {
    create: (data: Omit<VacinaAplicada, "id" | "dataCadastro" | "dataAtualizacao">) => {
        return prisma.vacinaAplicada.create({ data });
    },
    findAll: () => {
        return prisma.vacinaAplicada.findMany();
    },
    findById: (id: bigint) => {
        return prisma.vacinaAplicada.findUnique({ where: { id } });
    },
    findByIdAnimal: (idAnimal: bigint) => {
        return prisma.vacinaAplicada.findMany({ where: { idAnimal } });
    },
    update: (id: bigint, data: Partial<VacinaAplicada>) => {
        return prisma.vacinaAplicada.update({ where: { id }, data });
    },
    delete: (id: bigint) => {
        return prisma.vacinaAplicada.delete({ where: { id } });
    }
}