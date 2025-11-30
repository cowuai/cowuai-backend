import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";
import { PerfilController } from "./perfil.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();
const perfilController = container.resolve(PerfilController);
/**
 * @swagger
 * tags:
 *   - name: Perfil
 *     description: Rotas relacionadas ao perfil do usuário logado
 */

/**
 * @swagger
 * /api/perfil:
 *   get:
 *     summary: Obtém o perfil do usuário logado
 *     description: Retorna os dados detalhados do perfil do usuário autenticado via token.
 *     tags: [Perfil]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do usuário
 *                 nome:
 *                   type: string
 *                   description: Nome do usuário
 *                 email:
 *                   type: string
 *                   description: E-mail do usuário
 *       401:
 *         description: Acesso não autorizado (Token inválido ou ausente).
 *       404:
 *         description: Perfil de usuário não encontrado.
 */

router.get("/", authMiddleware, perfilController.getProfileById);

export default router;
