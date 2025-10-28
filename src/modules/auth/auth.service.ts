import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {jwtConfig} from "../../config/jwt";
import {UsuarioService} from "../usuario/usuario.service";
import {inject, injectable} from "tsyringe";
import {randomUUID} from "node:crypto";
import {prisma} from "../../config/prisma";
import nodemailer from "nodemailer";
import crypto from "crypto";

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
        const stored = await prisma.refreshToken.findUnique({
            where: {token: refreshToken},
            include: {usuario: true}, // pega o usuário junto
        });
        if (!stored || stored.expiresAt < new Date()) {
            throw new Error("Refresh token inválido ou expirado");
        }

        const newAccessToken = jwt.sign(
            {userId: stored.idUsuario},
            jwtConfig.secret,
            {expiresIn: jwtConfig.expiresIn}
        );

        return {
            accessToken: newAccessToken,
            user: stored.usuario,          // <<< retorna o usuário junto
            expiresIn: jwtConfig.expiresIn,

        };
    }

    async logout(idUsuario: string) {
        if (!idUsuario) throw new Error("ID do usuário é obrigatório");

        await prisma.refreshToken.deleteMany({where: {idUsuario: BigInt(idUsuario)}});
    }

    async forgotPassword(email: string) {
        const user = await this.usuarioService.findByEmail(email);
        if (!user) throw new Error("Usuário não encontrado");

        // Gera um token aleatório seguro (não JWT)
        const token = crypto.randomBytes(32).toString("hex");

        // Define expiração (15 minutos, por exemplo)
        const expires = new Date(Date.now() + 15 * 60 * 1000);

        // Atualiza o usuário com o token e expiração
        await this.usuarioService.update(user.id, {
            resetPasswordToken: token,
            resetPasswordExpires: expires,
        });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Redefinição de senha",
            html: `
      <p>Olá ${user.nome},</p>
      <p>Clique no link abaixo para redefinir sua senha (válido por 15 minutos):</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
        });
    }

    async resetPassword(token: string, novaSenha: string) {
        // Busca o usuário pelo token e verifica se não expirou
        const user = await this.usuarioService.findByResetToken(token);

        if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
            throw new Error("Token inválido ou expirado");
        }

        const hashedPassword = await bcrypt.hash(novaSenha, 10);

        await this.usuarioService.update(user.id, {
            senha: hashedPassword,
            resetPasswordToken: null, // invalida o token
            resetPasswordExpires: null,
        });

        return { message: "Senha redefinida com sucesso!" };
    }
}
