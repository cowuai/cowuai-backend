import {AplicacaoVacinaController} from "./aplicacaoVacina.controller";
import {Router} from "express";
import {container} from "tsyringe";
import {authMiddleware} from "../../middlewares/authMiddleware";

const router = Router();
const aplicacaoVacinaController = container.resolve(AplicacaoVacinaController);

/**
 * @swagger
 * tags:
 *   - name: AplicacaoVacina
 *     description: Rotas para gerenciamento de aplicações de vacinas em animais
 */

/**
 * @swagger
 * /api/aplicacoes-vacina:
 *   post:
 *     summary: Registra uma nova aplicação de vacina
 *     description: Adiciona um registro de aplicação de vacina para um animal.
 *     tags: [AplicacaoVacina]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idAnimal:
 *                 type: string
 *                 description: ID do animal que recebeu a vacina
 *               idTipoVacina:
 *                 type: string
 *                 description: ID da vacina aplicada
 *               dataAplicacao:
 *                 type: string
 *                 format: date
 *                 description: Data da aplicação da vacina (YYYY-MM-DD)
 *               proximaDose:
 *                 type: string
 *                 format: date
 *                 description: Data da próxima dose, se aplicável (YYYY-MM-DD)
 *               numeroDose:
 *                 type: integer
 *                 description: Número da dose aplicada
 *               lote:
 *                 type: string
 *                 description: Lote da vacina aplicada
 *               veterinario:
 *                 type: string
 *                 description: Nome do veterinário que aplicou a vacina
 *               observacoes:
 *                 type: string
 *                 description: Observações adicionais sobre a aplicação
 *     responses:
 *       201:
 *         description: Aplicação de vacina registrada com sucesso.
 *       400:
 *         description: Falha ao registrar a aplicação (dados inválidos).
 */
router.post(
    "/",
    authMiddleware,
    aplicacaoVacinaController.create
);

/**
 * @swagger
 * /api/aplicacoes-vacina:
 *   get:
 *     summary: Lista todas as aplicações de vacinas
 *     description: Retorna uma lista de todas as aplicações de vacinas registradas (requer autenticação).
 *     tags: [AplicacaoVacina]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de aplicações de vacinas
 *       401:
 *         description: Não autorizado
 */
router.get(
    "/",
    authMiddleware,
    aplicacaoVacinaController.findAll
);

/**
 * @swagger
 * /api/aplicacoes-vacina/id/{id}:
 *   get:
 *     summary: Busca aplicação de vacina por ID
 *     description: Retorna os detalhes de uma aplicação de vacina específica pelo seu ID.
 *     tags: [AplicacaoVacina]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da aplicação de vacina
 *     responses:
 *       200:
 *         description: Detalhes da aplicação de vacina
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Aplicação de vacina não encontrada
 */
router.get(
    "/id/:id",
    authMiddleware,
    aplicacaoVacinaController.findById
);

/**
 * @swagger
 * /api/aplicacoes-vacina/animal/{idAnimal}:
 *   get:
 *     summary: Lista aplicações de vacinas por ID do animal
 *     description: Retorna todas as aplicações de vacinas associadas a um animal específico.
 *     tags: [AplicacaoVacina]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idAnimal
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do animal
 *     responses:
 *       200:
 *         description: Lista de aplicações de vacinas para o animal especificado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Nenhuma aplicação de vacina encontrada para o animal especificado
 */
router.get(
    "/animal/:idAnimal",
    authMiddleware,
    aplicacaoVacinaController.findByIdAnimal
);

/**
 * @swagger
 * /api/aplicacoes-vacina/{id}:
 *   put:
 *     summary: Atualiza uma aplicação de vacina existente
 *     description: Atualiza os detalhes de uma aplicação de vacina específica pelo seu ID.
 *     tags: [AplicacaoVacina]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da aplicação de vacina a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idAnimal:
 *                 type: string
 *               idVacina:
 *                 type: string
 *               dataAplicacao:
 *                 type: string
 *                 format: date
 *               proximaDose:
 *                 type: string
 *                 format: date
 *               numeroDose:
 *                 type: integer
 *               lote:
 *                 type: string
 *               veterinario:
 *                 type: string
 *               observacoes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Aplicação de vacina atualizada com sucesso.
 *       400:
 *         description: Falha ao atualizar a aplicação (dados inválidos).
 *       404:
 *         description: Aplicação de vacina não encontrada.
 */
router.put(
    "/:id",
    authMiddleware,
    aplicacaoVacinaController.update
);

/**
 * @swagger
 * /api/aplicacoes-vacina/{id}:
 *   delete:
 *     summary: Remove uma aplicação de vacina
 *     description: Exclui uma aplicação de vacina específica pelo seu ID.
 *     tags: [AplicacaoVacina]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da aplicação de vacina a ser removida
 *     responses:
 *       204:
 *         description: Aplicação de vacina removida com sucesso.
 *       404:
 *         description: Aplicação de vacina não encontrada.
 */
router.delete(
    "/:id",
    authMiddleware,
    aplicacaoVacinaController.delete
);

export default router;