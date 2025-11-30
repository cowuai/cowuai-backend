import { Router } from "express";
import { FazendaController } from "./fazenda.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { container } from "tsyringe";

const router = Router();
const fazendaController = container.resolve(FazendaController);

/**
 * @swagger
 * tags:
 *   - name: Fazendas
 *     description: Rotas relacionadas ao cadastro e gestão de fazendas
 */

/**
 * @swagger
 * /api/fazendas:
 *   post:
 *     summary: Cria uma nova fazenda
 *     description: Cria uma nova fazenda vinculada ao usuário autenticado (idProprietario vem do token JWT).
 *     tags: [Fazendas]
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
 *               - endereco
 *               - cidade
 *               - estado
 *               - pais
 *               - porte
 *               - afixo
 *               - prefixo
 *               - sufixo
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome da fazenda
 *               endereco:
 *                 type: string
 *                 description: Endereço completo da fazenda
 *               cidade:
 *                 type: string
 *                 description: Cidade onde a fazenda está localizada
 *               estado:
 *                 type: string
 *                 description: Estado (UF) onde a fazenda está localizada
 *               pais:
 *                 type: string
 *                 description: País onde a fazenda está localizada
 *               porte:
 *                 type: string
 *                 description: Porte da fazenda
 *                 enum: [PEQUENO, MEDIO, GRANDE]
 *               afixo:
 *                 type: string
 *                 description: Afixo único da fazenda (prefixo/sufixo para nomes de animais)
 *               prefixo:
 *                 type: boolean
 *                 description: Indica se o afixo é usado como prefixo
 *               sufixo:
 *                 type: boolean
 *                 description: Indica se o afixo é usado como sufixo
 *     responses:
 *       201:
 *         description: Fazenda criada com sucesso.
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes.
 *       401:
 *         description: Usuário não autenticado.
 */

/**
 * @swagger
 * /api/fazendas:
 *   get:
 *     summary: Lista todas as fazendas
 *     description: Retorna a lista de todas as fazendas cadastradas.
 *     tags: [Fazendas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de fazendas retornada com sucesso.
 *       401:
 *         description: Usuário não autenticado.
 */


/**
 * @swagger
 * /api/fazendas/id/{id}:
 *   get:
 *     summary: Busca fazenda por ID
 *     description: Retorna uma fazenda específica a partir do seu ID.
 *     tags: [Fazendas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da fazenda (BigInt representado como string)
 *     responses:
 *       200:
 *         description: Fazenda encontrada com sucesso.
 *       404:
 *         description: Fazenda não encontrada.
 *       401:
 *         description: Usuário não autenticado.
 */


/**
 * @swagger
 * /api/fazendas/nome/{nome}:
 *   get:
 *     summary: Busca fazenda por nome
 *     description: Retorna fazendas que correspondem ao nome informado.
 *     tags: [Fazendas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome da fazenda
 *     responses:
 *       200:
 *         description: Fazenda(s) encontrada(s) com sucesso.
 *       404:
 *         description: Nenhuma fazenda encontrada com esse nome.
 *       401:
 *         description: Usuário não autenticado.
 */


/**
 * @swagger
 * /api/fazendas/proprietario/{idProprietario}:
 *   get:
 *     summary: Lista fazendas por proprietário
 *     description: Retorna todas as fazendas vinculadas ao ID do proprietário informado.
 *     tags: [Fazendas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idProprietario
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do proprietário (BigInt representado como string)
 *     responses:
 *       200:
 *         description: Lista de fazendas do proprietário retornada com sucesso.
 *       404:
 *         description: Nenhuma fazenda encontrada para esse proprietário.
 *       401:
 *         description: Usuário não autenticado.
 */


/**
 * @swagger
 * /api/fazendas/{id}:
 *   put:
 *     summary: Atualiza uma fazenda
 *     description: Atualiza os dados de uma fazenda existente.
 *     tags: [Fazendas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da fazenda (BigInt representado como string)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               endereco:
 *                 type: string
 *               cidade:
 *                 type: string
 *               estado:
 *                 type: string
 *               pais:
 *                 type: string
 *               porte:
 *                 type: string
 *                 enum: [PEQUENO, MEDIO, GRANDE]
 *               afixo:
 *                 type: string
 *               prefixo:
 *                 type: boolean
 *               sufixo:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Fazenda atualizada com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       404:
 *         description: Fazenda não encontrada.
 *       401:
 *         description: Usuário não autenticado.
 */

/**
 * @swagger
 * /api/fazendas/{id}:
 *   delete:
 *     summary: Deleta uma fazenda
 *     description: Remove uma fazenda pelo seu ID.
 *     tags: [Fazendas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da fazenda (BigInt representado como string)
 *     responses:
 *       204:
 *         description: Fazenda deletada com sucesso.
 *       404:
 *         description: Fazenda não encontrada.
 *       401:
 *         description: Usuário não autenticado.
 */
router.post("/", authMiddleware, fazendaController.create);
router.get("/", authMiddleware, fazendaController.findAll);
router.get("/id/:id", authMiddleware, fazendaController.findById);
router.get("/nome/:nome", authMiddleware, fazendaController.findByNome);
router.get(  "/proprietario/:idProprietario", authMiddleware, fazendaController.findByIdProprietario);
router.put("/:id", authMiddleware, fazendaController.update);
router.delete("/:id", authMiddleware, fazendaController.delete);


export default router;
