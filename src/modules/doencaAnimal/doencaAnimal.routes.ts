// src/modules/doencaAnimal/doencaAnimal.routes.ts
import { Router } from "express";
import { container } from "tsyringe";
import { DoencaAnimalController } from "./doencaAnimal.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();
const controller = container.resolve(DoencaAnimalController);

/**
 * @swagger
 * tags:
 *   name: DoencasAnimal
 *   description: Registro de doenças por animal
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DoencaAnimal:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         idAnimal:
 *           type: integer
 *           format: int64
 *         idDoenca:
 *           type: integer
 *           format: int64
 *         dataDiagnostico:
 *           type: string
 *           format: date-time
 *         emTratamento:
 *           type: boolean
 *         dataInicioTratamento:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         dataFimTratamento:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         observacoes:
 *           type: string
 *           nullable: true
 *         dataCadastro:
 *           type: string
 *           format: date-time
 *         dataAtualizacao:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/animais/{idAnimal}/doencas:
 *   get:
 *     summary: Lista o histórico de doenças de um animal
 *     tags: [DoencasAnimal]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idAnimal
 *         schema:
 *           type: integer
 *           format: int64
 *         required: true
 *         description: ID do animal
 *     responses:
 *       200:
 *         description: Lista de doenças do animal
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DoencaAnimal'
 *       404:
 *         description: Animal não encontrado
 */


/**
 * @swagger
 * /api/animais/{idAnimal}/doencas/ativas:
 *   get:
 *     summary: Lista as doenças ativas de um animal
 *     tags: [DoencasAnimal]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idAnimal
 *         schema:
 *           type: integer
 *           format: int64
 *         required: true
 *         description: ID do animal
 *     responses:
 *       200:
 *         description: Lista de doenças ativas do animal
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DoencaAnimal'
 *       404:
 *         description: Animal não encontrado
 */

/**
 * @swagger
 * /api/animais/{idAnimal}/doencas:
 *   post:
 *     summary: Registra uma doença para um animal
 *     tags: [DoencasAnimal]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idAnimal
 *         schema:
 *           type: integer
 *           format: int64
 *         required: true
 *         description: ID do animal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idDoenca
 *             properties:
 *               idDoenca:
 *                 type: integer
 *                 format: int64
 *               dataDiagnostico:
 *                 type: string
 *                 format: date-time
 *               emTratamento:
 *                 type: boolean
 *               dataInicioTratamento:
 *                 type: string
 *                 format: date-time
 *               dataFimTratamento:
 *                 type: string
 *                 format: date-time
 *               observacoes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Doença registrada para o animal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DoencaAnimal'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Animal ou doença não encontrada
 */


/**
 * @swagger
 * /api/animais/doencas/{id}:
 *   put:
 *     summary: Atualiza um registro de doença do animal
 *     tags: [DoencasAnimal]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           format: int64
 *         required: true
 *         description: ID do registro de doença do animal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idDoenca:
 *                 type: integer
 *                 format: int64
 *               dataDiagnostico:
 *                 type: string
 *                 format: date-time
 *               emTratamento:
 *                 type: boolean
 *               dataInicioTratamento:
 *                 type: string
 *                 format: date-time
 *               dataFimTratamento:
 *                 type: string
 *                 format: date-time
 *               observacoes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DoencaAnimal'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Registro não encontrado
 */


/**
 * @swagger
 * /api/animais/doencas/{id}:
 *   delete:
 *     summary: Remove um registro de doença do animal
 *     tags: [DoencasAnimal]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           format: int64
 *         required: true
 *         description: ID do registro de doença do animal
 *     responses:
 *       204:
 *         description: Registro removido
 *       404:
 *         description: Registro não encontrado
 */


router.get("/:idAnimal/doencas", authMiddleware, controller.listByAnimal);
router.get("/:idAnimal/doencas/ativas", authMiddleware, controller.listAtivasByAnimal);
router.post("/:idAnimal/doencas", authMiddleware, controller.createForAnimal);
router.put("/doencas/:id", authMiddleware, controller.update);
router.delete("/doencas/:id", authMiddleware, controller.delete);

export default router;
