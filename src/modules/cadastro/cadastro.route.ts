import "reflect-metadata";
import {Request, Response, NextFunction, Router} from "express";
import {container} from "tsyringe";
import {UsuarioService} from "../usuario/usuario.service";
import {FazendaService} from "../fazenda/fazenda.service";
import {AuthService} from "../auth/auth.service";
import bcrypt from "bcrypt";

const router = Router();
const usuarioService = container.resolve(UsuarioService);
const fazendaService = container.resolve(FazendaService);
const authService = container.resolve(AuthService);

/**
 * @swagger
 * tags:
 *   - name: Cadastro
 *     description: Rotas relacionadas ao cadastro unificado de usuário e fazenda
 */

/**
 * @swagger
 * /api/cadastro:
 *   post:
 *     summary: Cadastro unificado de usuário e fazenda
 *     description: Cria um novo usuário e uma fazenda vinculada a ele em uma única requisição.
 *     tags: [Cadastro]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cpf
 *               - nome
 *               - email
 *               - senha
 *               - fazenda
 *             properties:
 *               cpf:
 *                 type: string
 *                 description: CPF do usuário (11 dígitos)
 *               nome:
 *                 type: string
 *                 description: Nome completo do usuário
 *               email:
 *                 type: string
 *                 description: E-mail de login do usuário
 *               senha:
 *                 type: string
 *                 description: Senha para acesso
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento (YYYY-MM-DD)
 *               telefone:
 *                 type: string
 *                 description: Telefone de contato
 *               localizacao:
 *                 type: string
 *                 description: Localização do usuário
 *               urlImagem:
 *                 type: string
 *                 description: URL da imagem do perfil do usuário
 *               fazenda:
 *                 type: object
 *                 description: Dados da fazenda a ser criada
 *                 properties:
 *                   nome:
 *                     type: string
 *                     description: Nome da fazenda
 *                   endereco:
 *                     type: string
 *                     description: Endereço completo da fazenda
 *                   cidade:
 *                     type: string
 *                     description: Cidade onde a fazenda está localizada
 *                   estado:
 *                     type: string
 *                     description: Estado (UF) onde a fazenda está localizada
 *                   pais:
 *                     type: string
 *                     description: País onde a fazenda está localizada
 *                   porte:
 *                     type: string
 *                     description: Porte da fazenda
 *                     enum: [PEQUENO, MEDIO, GRANDE]
 *                   afixo:
 *                     type: string
 *                     description: Afixo único da fazenda (prefixo/sufixo para nomes de animais)
 *                   prefixo:
 *                     type: boolean
 *                     description: Indica se o afixo é usado como prefixo
 *                   sufixo:
 *                     type: boolean
 *                     description: Indica se o afixo é usado como sufixo
 *     responses:
 *       201:
 *         description: Cadastro realizado com sucesso, retornando os dados de login.
 *       400:
 *         description: Campos obrigatórios faltando ou dados inválidos.
 *       409:
 *         description: Email ou CPF já cadastrado.
 *       500:
 *         description: Erro interno no servidor.
 */
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {cpf, nome, email, senha, dataNascimento, telefone, localizacao, urlImagem, fazenda} = req.body;

        if (!cpf || !nome || !email || !senha || !fazenda) {
            return res.status(400).json({message: "Campos obrigatórios faltando"});
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const usuario = await usuarioService.create({
            cpf,
            nome,
            email,
            googleId: null,
            senha: hashedPassword,
            dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
            ativo: true,
            telefone: telefone || "",
            localizacao: localizacao || "",
            urlImagem: urlImagem || "",
            resetPasswordToken: null,
            resetPasswordExpires: null
        });

        await fazendaService.create({
            ...req.body.fazenda,
            idProprietario: usuario.id,
            prefixo: req.body.fazenda?.prefixo === true,
            sufixo: req.body.fazenda?.sufixo === true,
            porte: req.body.fazenda?.porte
        });

        const loginPayload = await authService.login(email, senha);

        return res.status(201).json({
            message: "Cadastro realizado com sucesso!",
            ...loginPayload
        });
    } catch (error) {
        next(error);
    }
});

export default router;
