import { Router } from "express";
import { AnimalController } from "./animal.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { validateResource } from "../../middlewares/validateResource"; // <--- Importante
import {
  createAnimalSchema,
  updateAnimalSchema,
  getAnimalByIdSchema,
} from "../../schemas/animal.schema"; // <--- Importante
import { container } from "tsyringe";

const router = Router();
const animalController = container.resolve(AnimalController);

/**
 * @swagger
 * /api/animais:
 *   post:
 *     summary: Cria um novo animal
 *     description: Adiciona um novo animal ao sistema (requer autenticação).
 *     tags: [Animais]
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
 *                 enum: [MACHO, FEMEA, TODOS]
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
 *       "201":
 *         description: Animal criado com sucesso.
 *       "400":
 *         description: Falha na validação.
 *       "401":
 *         description: Acesso não autorizado.
 */
/**
 * @swagger
 * /api/animais:
 *   get:
 *     summary: Lista todos os animais
 *     description: Retorna uma lista de animais (paginada).
 *     tags: [Animais]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Itens por página
 *     responses:
 *       "200":
 *         description: Lista retornada com sucesso.
 */
/**
 * @swagger
 * /api/animais/id/{id}:
 *   get:
 *     summary: Busca animal por ID
 *     tags: [Animais]
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
 *       "200":
 *         description: Animal encontrado.
 *       "404":
 *         description: Animal não encontrado.
 */
/**
 * @swagger
 * /api/animais/{id}:
 *   put:
 *     summary: Atualiza um animal
 *     tags: [Animais]
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
 *       "200":
 *         description: Animal atualizado.
 *       "400":
 *         description: Erro de validação.
 */
/**
 * @swagger
 * /api/animais/{id}:
 *   delete:
 *     summary: Exclui um animal
 *     tags: [Animais]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: Animal excluído.
 */

// --- DEFINIÇÃO DAS ROTAS ---

// 1. Rota POST (Com validação do Body)
router.post(
  "/",
  authMiddleware,
  validateResource(createAnimalSchema), // <--- Validação Zod aqui
  animalController.create
);

// 2. Rota GET Geral
router.get("/", authMiddleware, animalController.findAll);

// 3. Rota GET por ID (Com validação do ID na URL)
router.get(
  "/id/:id",
  authMiddleware,
  validateResource(getAnimalByIdSchema), // <--- Validação Zod aqui
  animalController.findById
);

// Rotas específicas (ainda sem schema específico de validação de param, confiando no controller)
router.get(
  "/relation/:id/:relation",
  authMiddleware,
  animalController.findByIdWithRelations
);
router.get(
  "/proprietario/:idProprietario",
  authMiddleware,
  animalController.findByProprietario
);
router.get(
  "/fazenda/:idFazenda",
  authMiddleware,
  animalController.findByFazenda
);

// 4. Rota PUT (Com validação de ID e Body)
router.put(
  "/:id",
  authMiddleware,
  validateResource(updateAnimalSchema), // <--- Validação Zod aqui
  animalController.update
);

// 5. Rota DELETE (Com validação de ID)
router.delete(
  "/:id",
  authMiddleware,
  validateResource(getAnimalByIdSchema), // <--- Validação Zod aqui
  animalController.delete
);

export default router;
