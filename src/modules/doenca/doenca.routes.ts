// src/modules/doenca/doenca.routes.ts
import { Router } from "express";
import { container } from "tsyringe";
import { DoencaController } from "./doenca.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();
const doencaController = container.resolve(DoencaController);

/**
 * @swagger
 * tags:
 *   name: Doencas
 *   description: CRUD de doenças
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Doenca:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Brucelose"
 *         descricao:
 *           type: string
 *           nullable: true
 *           example: "Doença bacteriana que afeta bovinos."
 *         ehCronica:
 *           type: boolean
 *           example: false
 *         dataCadastro:
 *           type: string
 *           format: date-time
 *         dataAtualizacao:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/doencas:
 *   get:
 *     summary: Lista todas as doenças
 *     tags: [Doencas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de doenças
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doenca'
 */


/**
 * @swagger
 * /api/doencas/{id}:
 *   get:
 *     summary: Busca uma doença pelo ID
 *     tags: [Doencas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           format: int64
 *         required: true
 *         description: ID da doença
 *     responses:
 *       200:
 *         description: Doença encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doenca'
 *       404:
 *         description: Doença não encontrada
 */


/**
 * @swagger
 * /api/doencas:
 *   post:
 *     summary: Cria uma nova doença
 *     tags: [Doencas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Mastite"
 *               descricao:
 *                 type: string
 *                 example: "Inflamação da glândula mamária."
 *               ehCronica:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Doença criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doenca'
 *       400:
 *         description: Dados inválidos ou doença já existente
 */


/**
 * @swagger
 * /api/doencas/{id}:
 *   put:
 *     summary: Atualiza uma doença existente
 *     tags: [Doencas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           format: int64
 *         required: true
 *         description: ID da doença
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               ehCronica:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Doença atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doenca'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Doença não encontrada
 */


/**
 * @swagger
 * /api/doencas/{id}:
 *   delete:
 *     summary: Remove uma doença
 *     tags: [Doencas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           format: int64
 *         required: true
 *         description: ID da doença
 *     responses:
 *       204:
 *         description: Doença removida com sucesso
 *       404:
 *         description: Doença não encontrada
 */



router.get("/", authMiddleware, doencaController.findAll);
router.get("/:id", authMiddleware, doencaController.findById);
router.post("/", authMiddleware, doencaController.create);
router.put("/:id", authMiddleware, doencaController.update);
router.delete("/:id", authMiddleware, doencaController.delete);

export default router;
