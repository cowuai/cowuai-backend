import {Router} from "express";
import {container} from "tsyringe";
import {TipoRacaController} from "./tipoRaca.controller";
import {authMiddleware} from "../../middlewares/authMiddleware";

const router = Router();
const tipoRacaController = container.resolve(TipoRacaController);

/**
 * @swagger
 * /api/tipos-raca:
 *   get:
 *     tags:
 *       - TipoRaca
 *     security:
 *       - bearerAuth: []
 *     summary: Lista todos os tipos de raça disponíveis (enum)
 *     responses:
 *       200:
 *         description: Lista de tipos de raça
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: Nome da raça (valor do enum `TipoRaca`)
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", authMiddleware, (req, res) => {
    try {
        const tiposRaca = tipoRacaController.findAll();
        res.json(tiposRaca);
    } catch (error) {
        res.status(500).json({error: (error as Error).message});
    }
});

export default router;