import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {jwtConfig} from "../../config/jwt";
import {prisma} from "../../config/prisma";

export class AuthService {
    async login(email: string, password: string) {
        const user = await prisma.usuario.findUnique({where: {email}});

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const isPasswordValid = await bcrypt.compare(password, user.senha);
        if (!isPasswordValid) {
            throw new Error("Senha inválida");
        }

        const token = jwt.sign(
            {userId: user.id, email: user.email},
            jwtConfig.secret,
            {expiresIn: jwtConfig.expiresIn}
        );

        return {token, user};
    }
}
