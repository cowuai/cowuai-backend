import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {jwtConfig} from "../../config/jwt";
import {UsuarioService} from "../usuario/usuario.service";
import {inject, injectable} from "tsyringe";
import {randomUUID} from "node:crypto";
import {prisma} from "../../config/prisma";

@injectable()
export class AuthService {
    constructor(@inject(UsuarioService) private usuarioService: UsuarioService) {
    }

    async login(email: string, password: string, dispositivo?: string) {
        const user = await this.usuarioService.findByEmail(email);

        if (!user) throw new Error("Usuário não encontrado");

        const isPasswordValid = await bcrypt.compare(password, user.senha);
        if (!isPasswordValid) throw new Error("Senha inválida");

        // Gera o access token curto
        const accessToken = jwt.sign(
            {userId: user.id, email: user.email},
            jwtConfig.secret,
            {expiresIn: jwtConfig.expiresIn}
        );

        // Gera o refresh token longo
        const refreshToken = randomUUID();
        const refreshTokenExpiresAt = new Date();
        refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7);

        // Salvo o refresh token no banco de dados
        await prisma.refreshToken.upsert({
            where: {
                idUsuario_dispositivo: {
                    idUsuario: user.id,
                    dispositivo: dispositivo || "Desconhecido",
                },
            },
            update: {
                token: refreshToken,
                expiresAt: refreshTokenExpiresAt,
            },
            create: {
                idUsuario: user.id,
                token: refreshToken,
                expiresAt: refreshTokenExpiresAt,
                dispositivo: dispositivo || "Desconhecido",
            },
        });


        return {
            accessToken,
            refreshToken,
            user,
            expiresIn: jwtConfig.expiresIn
        };
    }

    async refresh(refreshToken: string) {
        const stored = await prisma.refreshToken.findUnique({where: {token: refreshToken}});
        if (!stored || stored.expiresAt < new Date()) {
            throw new Error("Refresh token inválido ou expirado");
        }

        const newAccessToken = jwt.sign(
            {userId: stored.idUsuario},
            jwtConfig.secret,
            {expiresIn: jwtConfig.expiresIn}
        );

        return {accessToken: newAccessToken, expiresIn: jwtConfig.expiresIn};
    }

    async logout(idUsuario: string) {
        if (!idUsuario) throw new Error("ID do usuário é obrigatório");

        await prisma.refreshToken.deleteMany({where: {idUsuario: BigInt(idUsuario)}});
    }
}
