import { Router } from "express";
import { AuthController } from "./auth.controller";
import { container } from "tsyringe";
import { authMiddleware } from "../../middlewares/authMiddleware";
import passport from "../../config/passport";

const router = Router();
const authController = container.resolve(AuthController);

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Rotas de autenticação e recuperação de senha
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza login
 *     description: Faz login com email e senha e retorna um access token JWT e informações do usuário.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "teste@email.com"
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *               dispositivo:
 *                 type: string
 *                 description: Nome opcional do dispositivo usado no login.
 *                 example: "web"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 *       400:
 *         description: Erro ao autenticar usuário.
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Renova o access token
 *     description: Gera um novo access token usando um refresh token válido enviado no cookie ou no corpo.
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token opcional enviado no corpo da requisição.
 *     responses:
 *       200:
 *         description: Novo access token gerado com sucesso.
 *       401:
 *         description: Refresh token ausente, inválido ou expirado.
 */
router.post("/refresh", authController.refresh);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Faz logout do usuário
 *     description: Remove os refresh tokens do usuário e limpa o cookie de sessão.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Logout realizado com sucesso.
 *       401:
 *         description: Usuário não autenticado.
 */
router.post("/logout", authMiddleware, authController.logout);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Solicita redefinição de senha
 *     description: Envia um email com link de redefinição de senha para o usuário.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "usuario@exemplo.com"
 *     responses:
 *       200:
 *         description: Email de recuperação enviado com sucesso.
 *       400:
 *         description: Usuário não encontrado ou erro ao enviar email.
 */
router.post("/forgot-password", authController.forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Redefine a senha do usuário
 *     description: Redefine a senha a partir de um token válido de recuperação.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de redefinição recebido por email.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Nova senha do usuário.
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso.
 *       400:
 *         description: Token inválido ou expirado.
 */
router.post("/reset-password", authController.resetPassword);

/**
 * @swagger
 * /api/auth/validate-reset-token:
 *   post:
 *     summary: Valida o token de redefinição de senha
 *     description: Verifica se o token de redefinição de senha ainda é válido.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de redefinição recebido por email.
 *     responses:
 *       200:
 *         description: Token válido.
 *       400:
 *         description: Token inválido ou expirado.
 */
router.post("/validate-reset-token", authController.validateResetToken);

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Inicia autenticação com Google
 *     description: Redireciona o usuário para o Google para autenticação.
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirecionamento para o Google.
 */
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Callback de autenticação com Google
 *     description: Endpoint para onde o Google redireciona após a autenticação.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida.
 *       401:
 *         description: Falha na autenticação com Google.
 */
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    authController.googleCallback
);

export default router;
