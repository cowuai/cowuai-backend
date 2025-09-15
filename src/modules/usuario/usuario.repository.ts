import { prisma } from "../../config/prisma";
import { Usuario } from "@prisma/client";

export const usuarioRepository = {
    create: (data: Omit<Usuario, "id">) => {
        return prisma.usuario.create({ data });
    },
    findByCpf: (cpf: string) => {
        return prisma.usuario.findUnique({where: {cpf}});
    }, 
    findByEmail: (email: string) => {
        return prisma.usuario.findUnique({where: {email}});
    }, 
    findAll: () => prisma.usuario.findMany(),

  findById: (id: bigint) =>
    prisma.usuario.findUnique({ where: { id } }),

  findByNome: (nome: string) =>
    prisma.usuario.findMany({ where: { nome } }),




}