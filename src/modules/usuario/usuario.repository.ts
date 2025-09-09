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
    }



}