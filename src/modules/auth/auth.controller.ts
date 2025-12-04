import {Request, Response, NextFunction} from "express";
import {AuthService} from "./auth.service";
import {inject, injectable} from "tsyringe";

@injectable()
export class AuthController {
    constructor(@inject(AuthService) private authService: AuthService) {
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {email, senha, dispositivo} = req.body;
            const {
                accessToken,
                refreshToken,
                user,
                expiresIn
            } = await this.authService.login(email, senha, dispositivo);
            console.log('Nova requisição recebida em /login');

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // só true em produção (https)
                sameSite: 'lax',
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
            })

            return res.status(200).json({accessToken, user, expiresIn});
        } catch (error) {
            next(error);
        }
    }

    refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {refreshToken: bodyToken} = req.body;
            const refreshToken = req.cookies.refreshToken || bodyToken;
            console.log("Refresh Token:", refreshToken);

            if (!refreshToken) return res.status(401).json({error: "Refresh token ausente"});

            const {accessToken, user, expiresIn} = await this.authService.refresh(refreshToken); //inclui user
            return res.json({accessToken, user, expiresIn}); // <<< devolve user
        } catch (error) {
            next(error);
        }
    };

    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {userId} = (req as any).user;
            console.log('Nova requisição recebida em /logout');

            if (!userId) {
                return res.status(401).json({error: "Usuário não autenticado."});
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
        } catch (error) {
            next(error);
        }
    }

    forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {email} = req.body;

            await this.authService.forgotPassword(email);
            return res.status(200).json({message: "Instruções para redefinição de senha enviadas para o email."});
        } catch (error) {
            next(error);
        }
    }

    resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {token, password} = req.body;

            await this.authService.resetPassword(token, password);
            return res.status(200).json({message: "Senha redefinida com sucesso."});
        } catch (error) {
            next(error);
        }
    }

    validateResetToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {token} = req.body;

            await this.authService.validateResetToken(token);
            return res.status(200).json({message: "Token válido."});
        } catch (error) {
            next(error);
        }
    }

    googleCallback = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // O passport adiciona o usuário em req.user após o sucesso
            const user = (req as any).user;

            if (!user) {
                return res.status(401).json({ error: "Falha na autenticação Google" });
            }

            // Gera os tokens usando o serviço
            const { accessToken, refreshToken } = await this.authService.generateTokensForUser(user, "GoogleWeb");

            // Configura o cookie do Refresh Token igual ao login normal
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            // REDIRECIONAMENTO:
            // Diferente do login normal (JSON), o OAuth acontece via redirect do navegador.
            // Precisamos redirecionar de volta para o Front-end passando o AccessToken.
            // O Front vai pegar esse token da URL e salvar.

            const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
            return res.redirect(`${frontendUrl}/auth/callback?accessToken=${accessToken}`);

        } catch (error) {
            console.error("Erro no callback do Google OAuth:", error);
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
        }
    }
}