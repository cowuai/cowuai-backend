import {prisma} from "../../config/prisma";
import {Prisma} from "@prisma/client";

export const usuarioRepository = {
    create: (data: Prisma.UsuarioCreateInput) => {
        return prisma.usuario.create({data: data});
    },
    findByCpf: (cpf: string) => {
        return prisma.usuario.findUnique({where: {cpf}});
    },
    findByEmail: (email: string) => {
        return prisma.usuario.findUnique({where: {email}});
    },
    findAll: () => prisma.usuario.findMany(),

    findById: (id: bigint) =>
        prisma.usuario.findUnique({where: {id}}),

    findByNome: (nome: string) =>
        prisma.usuario.findMany({where: {nome}}),

    update: (id: bigint, data: Prisma.UsuarioUpdateInput) =>
        prisma.usuario.update({where: {id}, data}),

    delete: (id: bigint) =>
        prisma.usuario.delete({where: {id}}),

    findByResetToken: (token: string) => {
        return prisma.usuario.findFirst({where: {resetPasswordToken: token}});
    },

    findByGoogleId: (googleId: string) => {
        // cast `where` to any because generated Prisma types may not include googleId in some contexts
        return prisma.usuario.findFirst({ where: { googleId } as any });
    }
}