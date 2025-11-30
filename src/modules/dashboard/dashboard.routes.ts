import { Router } from "express";
import { getDashboardData } from "./dashboard.controller";
import {authMiddleware} from "../../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     summary: Obter dados agregados do dashboard do proprietário
 *     responses:
 *       200:
 *         description: Dados do dashboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vacinacoesPorMes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       label:
 *                         type: string
 *                       count:
 *                         type: integer
 *                 animaisPorLocalizacao:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       label:
 *                         type: string
 *                       count:
 *                         type: integer
 *                 tipoRaca:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       label:
 *                         type: string
 *                       count:
 *                         type: integer
 *                 animaisPorSexo:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       sexo:
 *                         type: string
 *                       count:
 *                         type: integer
 *                 animaisDoentes:
 *                   type: integer
 *                 taxaReproducao:
 *                   type: integer
 *                 totalAnimais:
 *                   type: integer
 *                 totalAnimaisComRegistro:
 *                   type: integer
 *                 totalFazendasDoCriador:
 *                   type: integer
 *                 totalAnimaisVendidos:
 *                   type: integer
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
// Rota para obter dados agregados do dashboard
router.get("/", authMiddleware, getDashboardData);

export default router;