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

        // Define expiração (15 minutos)
        const expires = new Date(Date.now() + 15 * 60 * 1000);

        // Atualiza o usuário com o token e expiração
        await this.usuarioService.update(user.id, {
            resetPasswordToken: token,
            resetPasswordExpires: expires,
        });

        const resetLink = `${process.env.FRONTEND_URL}/esqueci-a-senha/${token}`;

        console.log(`EMAIL_USER: ${process.env.EMAIL_USER}`);
        console.log(`EMAIL_PASS: ${process.env.EMAIL_PASS}`);

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
            subject: "🔒 Redefinição de senha - CowUai",
            html: `
              <div style="
                font-family: 'Segoe UI', sans-serif;
                background-color: #f5f5f4;
                color: #0c0a09;
                padding: 24px;
              ">
                <div style="
                  max-width: 500px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                ">
                  <div style="background-color: #7f1d1d; padding: 24px; text-align: center;">
                    <img src="https://i.imgur.com/XW73z8m.png" alt="CowUai" width="64" style="margin-bottom: 8px;">
                    <h1 style="color: #ffffff; font-size: 20px; margin: 0;">CowUai</h1>
                  </div>
                  <div style="padding: 24px;">
                    <h2 style="font-size: 18px; color: #7f1d1d;">Olá, ${user.nome}!</h2>
                    <p style="line-height: 1.6; font-size: 15px;">
                      Recebemos uma solicitação para redefinir sua senha.<br>
                      Clique no botão abaixo para criar uma nova senha. Este link é válido por <strong>15 minutos</strong>.
                    </p>
            
                    <div style="text-align: center; margin: 32px 0;">
                      <a href="${resetLink}" style="
                        background-color: #7f1d1d;
                        color: #ffffff;
                        text-decoration: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        font-weight: 600;
                        display: inline-block;
                      ">
                        Redefinir minha senha
                      </a>
                    </div>
            
                    <p style="font-size: 13px; color: #57534e;">
                      Se você não solicitou essa alteração, ignore este e-mail.<br>
                      Sua conta permanecerá segura.
                    </p>
                  </div>
                  <div style="
                    background-color: #f5f5f4;
                    text-align: center;
                    padding: 16px;
                    font-size: 12px;
                    color: #78716c;
                  ">
                    © ${new Date().getFullYear()} CowUai — Todos os direitos reservados.
                  </div>
                </div>
              </div>
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

        return {message: "Senha redefinida com sucesso!"};
    }

    async validateResetToken(token: string) {
        const user = await this.usuarioService.findByResetToken(token);

        if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
            throw new Error("Token inválido ou expirado");
        }

        return {message: "Token válido."};
    }
}
