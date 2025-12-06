import { Router } from "express";
import { AnimalController } from "./animal.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { validateResource } from "../../middlewares/validateResource";
import {
  createAnimalSchema,
  updateAnimalSchema,
  getAnimalByIdSchema,
} from "./animal.zodScheme";
import { container } from "tsyringe";

const router = Router();
const animalController = container.resolve(AnimalController);

/**
 * @swagger
 * tags:
 *   - name: Animais
 *     description: Gerenciamento de animais (gado)
 *
 * components:
 *   schemas:
 *     Animal:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         nome:
 *           type: string
 *         tipoRaca:
 *           type: string
 *         sexo:
 *           type: string
 *           enum: [MACHO, FEMEA]
 *         dataNascimento:
 *           type: string
 *           format: date-time
 *         peso:
 *           type: number
 *         status:
 *           type: string
 *         idFazenda:
 *           type: integer
 *         idProprietario:
 *           type: integer
 *     PaginationResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Animal'
 *         pagination:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *             pageSize:
 *               type: integer
 *             totalItems:
 *               type: integer
 *             totalPages:
 *               type: integer
 *
 * /api/animais:
 *   post:
 *     summary: Cria um novo animal
 *     description: Adiciona um novo animal ao sistema.
 *     tags:
 *       - Animais
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
 *               - tipoRaca
 *               - sexo
 *               - idFazenda
 *             properties:
 *               nome:
 *                 type: string
 *               tipoRaca:
 *                 type: string
 *                 description: "Ex: NELORE, ANGUS, HOLANDES"
 *               sexo:
 *                 type: string
 *                 enum: [MACHO, FEMEA]
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *               peso:
 *                 type: number
 *               status:
 *                 type: string
 *                 default: VIVO
 *               idProprietario:
 *                 type: number
 *               idFazenda:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Animal criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       '400':
 *         description: Falha na validação dos dados.
 *       '401':
 *         description: Não autorizado.
 *
 *   get:
 *     summary: Lista todos os animais (Paginado)
 *     description: Retorna uma lista de animais.
 *     tags:
 *       - Animais
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Itens por página
 *     responses:
 *       '200':
 *         description: Lista retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Animal'
 *
 * /api/animais/id/{id}:
 *   get:
 *     summary: Busca animal por ID
 *     tags:
 *       - Animais
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do animal
 *     responses:
 *       '200':
 *         description: Animal encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       '404':
 *         description: Animal não encontrado.
 *
 * /api/animais/relation/{id}/{relation}:
 *   get:
 *     summary: Busca relações do animal (Pais, Filhos, Vacinas)
 *     tags:
 *       - Animais
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do animal base
 *       - in: path
 *         name: relation
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pais, filhos, vacinacoes]
 *         description: Tipo de relação desejada
 *     responses:
 *       '200':
 *         description: Dados relacionados retornados.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       '400':
 *         description: Relação inválida.
 *
 * /api/animais/proprietario/{idProprietario}:
 *   get:
 *     summary: Lista animais por Proprietário (Paginado)
 *     tags:
 *       - Animais
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idProprietario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do proprietário
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       '200':
 *         description: Lista de animais do proprietário.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginationResponse'
 *
 * /api/animais/fazenda/{idFazenda}:
 *   get:
 *     summary: Lista animais por Fazenda (Sem paginação)
 *     tags:
 *       - Animais
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idFazenda
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da fazenda
 *     responses:
 *       '200':
 *         description: Lista de animais da fazenda.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Animal'
 *
 * /api/animais/{id}:
 *   put:
 *     summary: Atualiza um animal
 *     tags:
 *       - Animais
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
 *               tipoRaca:
 *                 type: string
 *               sexo:
 *                 type: string
 *               peso:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Animal atualizado.
 *         content:
 *           application/json':
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       '400':
 *         description: Erro de validação.
 *
 *   delete:
 *     summary: Exclui um animal
 *     tags:
 *       - Animais
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Animal excluído com sucesso (Sem conteúdo).
 */

router.post(
  "/",
  authMiddleware,
  validateResource(createAnimalSchema),
  animalController.create
);

router.get("/", authMiddleware, animalController.findAll);

router.get(
  "/id/:id",
  authMiddleware,
  validateResource(getAnimalByIdSchema),
  animalController.findById
);

router.get(
  "/relation/:id/:relation",
  authMiddleware,
  animalController.findByIdWithRelations
);

router.get(
  "/proprietario/:idProprietario",
  authMiddleware,
  animalController.findByProprietarioPaginated
);

router.get(
  "/fazenda/:idFazenda",
  authMiddleware,
  animalController.findByFazenda
);

router.put(
  "/:id",
  authMiddleware,
  validateResource(updateAnimalSchema),
  animalController.update
);

router.delete(
  "/:id",
  authMiddleware,
  validateResource(getAnimalByIdSchema),
  animalController.delete
);

export default router;
