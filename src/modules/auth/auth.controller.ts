import {Request, Response} from "express";
import {AuthService} from "./auth.service";
import {inject, injectable} from "tsyringe";
import {debug} from "node:util";

@injectable()
export class AuthController {
    constructor(@inject(AuthService) private authService: AuthService) {}

    login = async (req: Request, res: Response) => {
        try {
            const { email, senha, dispositivo } = req.body;
            const { accessToken, refreshToken, user, expiresIn } = await this.authService.login(email, senha, dispositivo);
            console.log('Nova requisição recebida em /login');

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // só true em produção (https)
                sameSite: 'lax',
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
            })

            return res.status(200).json({ accessToken, user, expiresIn });
        } catch (err: any) {
            console.error("Erro ao logar:", err);
            return res.status(400).json({ error: err.message });
        }
    }

    refresh = async (req: Request, res: Response) => {
        try {
            const { refreshToken: bodyToken } = req.body;
            const refreshToken = req.cookies.refreshToken || bodyToken;
            console.log("Refresh Token:", refreshToken);

            if (!refreshToken) return res.status(401).json({ error: "Refresh token ausente" });

            const { accessToken, user, expiresIn } = await this.authService.refresh(refreshToken); //inclui user
             return res.json({ accessToken, user, expiresIn }); // <<< devolve user
        } catch (err: any) {
            return res.status(401).json({ error: err.message });
        }
    };

    logout = async (req: Request, res: Response) => {
        try {
            const { userId } = (req as any).user;
            console.log('Nova requisição recebida em /logout');

            if (!userId) {
                return res.status(401).json({ error: "Usuário não autenticado." });
            }

            // limpo o refresh token no servidor (BD)
            await this.authService.logout(userId);

            // apago o cookie no cliente (navegador)
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
            });

            return res.status(204).send();
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}