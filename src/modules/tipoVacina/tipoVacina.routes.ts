import {TipoVacinaController} from "./tipoVacina.controller";
import {Router} from "express";
import {container} from "tsyringe";
import {authMiddleware} from "../../middlewares/authMiddleware";

const router = Router();
const tipoVacinaController = container.resolve(TipoVacinaController);

/**
 * @swagger
 * tags:
 *   name: TipoVacina
 *   description: Rotas para gerenciamento de tipos de vacina
 */

/**
 * @swagger
 * /api/tipo-vacina/:
 *   post:
 *     summary: Cria um novo tipo de vacina
 *     tags: [TipoVacina]
 *     security:
 *       - bearerAuth: []
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
 *               obrigatoria:
 *                 type: boolean
 *               generoAlvo:
 *                 type: string
 *               minIdadeMeses:
 *                 type: integer
 *               maxIdadeMeses:
 *                 type: integer
 *               frequencia:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tipo de vacina criado com sucesso
 *       500:
 *         description: Erro ao criar tipo de vacina
 */
router.post(
    "/",
    authMiddleware,
    tipoVacinaController.create
);

/**
 * @swagger
 * /api/tipo-vacina/:
 *   get:
 *     summary: Retorna todos os tipos de vacina
 *     tags: [TipoVacina]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tipos de vacina
 *       500:
 *         description: Erro ao buscar tipos de vacina
 */
router.get(
    "/",
    authMiddleware,
    tipoVacinaController.findAll
);

/**
 * @swagger
 * /api/tipo-vacina/id/{id}:
 *   get:
 *     summary: Retorna um tipo de vacina pelo ID
 *     tags: [TipoVacina]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de vacina encontrado
 *       500:
 *         description: Erro ao buscar tipo de vacina por ID
 */
router.get(
    "/id/:id",
    authMiddleware,
    tipoVacinaController.findById
);

/**
 * @swagger
 * /api/tipo-vacina/nome/{nome}:
 *   get:
 *     summary: Retorna tipos de vacina pelo nome
 *     tags: [TipoVacina]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tipos de vacina encontrados
 *       500:
 *         description: Erro ao buscar tipos de vacina por nome
 */
router.get(
    "/nome/:nome",
    authMiddleware,
    tipoVacinaController.findByNome
);

/**
 * @swagger
 * /api/tipo-vacina/{id}:
 *   put:
 *     summary: Atualiza um tipo de vacina pelo ID
 *     tags: [TipoVacina]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *               obrigatoria:
 *                 type: boolean
 *               generoAlvo:
 *                 type: string
 *               minIdadeMeses:
 *                 type: integer
 *               maxIdadeMeses:
 *                 type: integer
 *               frequencia:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tipo de vacina atualizado com sucesso
 *       500:
 *         description: Erro ao atualizar tipo de vacina
 */
router.put(
    "/:id",
    authMiddleware,
    tipoVacinaController.update
);

/**
 * @swagger
 * /api/tipo-vacina/{id}:
 *   delete:
 *     summary: Deleta um tipo de vacina pelo ID
 *     tags: [TipoVacina]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de vacina deletado com sucesso
 *       500:
 *         description: Erro ao deletar tipo de vacina
 */
router.delete(
    "/:id",
    authMiddleware,
    tipoVacinaController.delete
);

export default router;