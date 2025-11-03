import { UsuarioController } from "./usuario.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import express from "express";
import { container } from "tsyringe";

const router = express.Router();
const usuarioController = container.resolve(UsuarioController);

/**
 * @swagger
 * tags:
 *   - name: Usuários
 *     description: Rotas relacionadas à gestão de usuários
 */

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Adiciona um novo usuário ao sistema.
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome completo do novo usuário
 *               email:
 *                 type: string
 *                 description: E-mail de login do novo usuário
 *               senha:
 *                 type: string
 *                 description: Senha para acesso
 *               cpf:
 *                 type: string
 *                 description: CPF do usuário
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento (YYYY-MM-DD)
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Falha ao criar o usuário (dados inválidos, CPF/Email duplicado).
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     description: Retorna uma lista de todos os usuários cadastrados (requer autenticação).
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *       401:
 *         description: Acesso não autorizado.
 */

/**
 * @swagger
 * /api/usuarios/id/{id}:
 *   get:
 *     summary: Busca usuário por ID
 *     description: Retorna um usuário específico com base no ID informado (requer autenticação).
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 */

/**
 * @swagger
 * /api/usuarios/nome/{nome}:
 *   get:
 *     summary: Busca usuário por nome
 *     description: Retorna usuários que correspondem ao nome informado (requer autenticação).
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do usuário
 *     responses:
 *       200:
 *         description: Usuário(s) encontrado(s) com sucesso.
 *       404:
 *         description: Nenhum usuário encontrado com esse nome.
 */

/**
 * @swagger
 * /api/usuarios/cpf/{cpf}:
 *   get:
 *     summary: Busca usuário por CPF
 *     description: Retorna o usuário que corresponde ao CPF informado (requer autenticação).
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *         description: CPF do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso.
 *       404:
 *         description: Usuário não encontrado com esse CPF.
 */

/**
 * @swagger
 * /api/usuarios/email/{email}:
 *   get:
 *     summary: Busca usuário por e-mail
 *     description: Retorna o usuário que corresponde ao e-mail informado (requer autenticação).
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: E-mail do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso.
 *       404:
 *         description: Usuário não encontrado com esse e-mail.
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     description: Atualiza os dados de um usuário existente com base no ID (requer autenticação).
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               cpf:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       400:
 *         description: Erro na atualização (dados inválidos).
 *       404:
 *         description: Usuário não encontrado.
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Exclui um usuário
 *     description: Remove um usuário do sistema com base no ID (requer autenticação).
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser excluído
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 */

router.post("/", usuarioController.create);
router.get("/", authMiddleware, usuarioController.findAll);
router.get("/id/:id", authMiddleware, usuarioController.findById);
router.get("/nome/:nome", authMiddleware, usuarioController.findByNome);
router.get("/cpf/:cpf", authMiddleware, usuarioController.findByCpf);
router.get("/email/:email", authMiddleware, usuarioController.findByEmail);
router.put("/:id", authMiddleware, usuarioController.update);
router.delete("/:id", authMiddleware, usuarioController.delete);

export default router;
