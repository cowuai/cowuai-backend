import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../../middlewares/errorHandler";
import { UsuarioService } from "./usuario.service";
import bcrypt from "bcrypt";
import { AuthService } from "../auth/auth.service";
import { inject, injectable } from "tsyringe";
import { z } from "zod";

// Função para validar CPF
function validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let d1 = 11 - (soma % 11);
    if (d1 >= 10) d1 = 0;
    if (d1 !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    let d2 = 11 - (soma % 11);
    if (d2 >= 10) d2 = 0;
    return d2 === parseInt(cpf[10]);
}

// Schemas Zod (atualizados)
const createUsuarioSchema = z.object({
    cpf: z
        .string()
        .regex(/^\d{11}$/, "CPF deve conter exatamente 11 números")
        .refine(validarCPF, "CPF inválido"),

    nome: z
        .string()
        .min(8, "Nome muito curto")
        .max(255, "Nome muito longo")
        .refine((v) => v.trim().split(" ").length >= 2, {
            message: "Digite nome completo (nome e sobrenome)",
        })
        .refine(
            (v) => v.trim().split(" ").every((p) => p.length >= 2),
            { message: "Cada parte do nome deve ter ao menos 2 caracteres" }
        ),

    email: z.string().email("Email inválido"),

    senha: z
        .string()
        .min(8, "Senha deve ter ao menos 8 caracteres")
        .regex(/[A-Z]/, "Senha deve ter ao menos 1 letra maiúscula")
        .regex(/[a-z]/, "Senha deve ter ao menos 1 letra minúscula")
        .regex(/[0-9]/, "Senha deve ter ao menos 1 número")
        .regex(/[\W_]/, "Senha deve ter ao menos 1 caractere especial"),

    dataNascimento: z
        .string()
        .optional()
        .refine((s) => !s || !Number.isNaN(Date.parse(s)), "Data de nascimento inválida")
        .refine((s) => {
            if (!s) return true;
            const birth = new Date(s);
            const now = new Date();
            const age =
                now.getFullYear() -
                birth.getFullYear() -
                (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
            return age >= 18;
        }, "Usuário deve ter pelo menos 18 anos"),

    ativo: z.boolean().optional(),

    telefone: z
        .union([
            z.string().regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido"),
            z.literal("")
        ])
        .optional(),

    localizacao: z
        .union([
            z.string().max(255).regex(/^[\p{L}\p{N}\s,.-]*$/u, "Localização contém caracteres inválidos"),
            z.literal("")
        ])
        .optional(),

    urlImagem: z
        .union([
            z.string().url("URL inválida").max(2048),
            z.literal("")
        ])
        .optional(),
});

const updateUsuarioSchema = createUsuarioSchema.partial();

const idParamSchema = z.object({
    id: z.string().regex(/^\d+$/, "ID deve ser um número inteiro positivo"),
});

const nomeParamSchema = z.object({ nome: z.string().min(1, "Nome é obrigatório") });
const cpfParamSchema = z.object({ cpf: z.string().regex(/^\d{11}$/, "CPF inválido") });
const emailParamSchema = z.object({ email: z.string().email("Email inválido") });

@injectable()
export class UsuarioController {
    constructor(
        @inject(UsuarioService) private usuarioService: UsuarioService,
        @inject(AuthService) private authService: AuthService
    ) {}

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = createUsuarioSchema.parse(req.body);

            const plainSenha = data.senha;
            const hashedPassword = await bcrypt.hash(plainSenha, 10);

            const usuarioToCreate: any = {
                cpf: data.cpf,
                nome: data.nome,
                email: data.email,
                senha: hashedPassword,
                googleId: null,
                dataNascimento: data.dataNascimento ? new Date(data.dataNascimento) : null,
                ativo: data.ativo ?? true,
                telefone: data.telefone ?? "",
                localizacao: data.localizacao ?? "",
                urlImagem: data.urlImagem ?? "",
                resetPasswordToken: null,
                resetPasswordExpires: null,
            };

            await this.usuarioService.create(usuarioToCreate);

            const loggedUserWithToken = await this.authService.login(data.email, plainSenha);

            res.status(201).json(loggedUserWithToken);
        } catch (error) {
            next(error);
        }
    };

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usuarios = await this.usuarioService.findAll();
            res.status(200).json(usuarios);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = idParamSchema.parse(req.params);
            const usuario = await this.usuarioService.findById(BigInt(id));
            res.status(200).json(usuario);
        } catch (error) {
            next(error);
        }
    };

    findByNome = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { nome } = nomeParamSchema.parse(req.params);
            const usuarios = await this.usuarioService.findByNome(nome);
            res.status(200).json(usuarios);
        } catch (error) {
            next(error);
        }
    };

    findByCpf = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { cpf } = cpfParamSchema.parse(req.params);
            const usuario = await this.usuarioService.findByCpf(cpf);
            res.status(200).json(usuario);
        } catch (error) {
            next(error);
        }
    };

    findByEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = emailParamSchema.parse(req.params);
            const usuario = await this.usuarioService.findByEmail(email);
            res.status(200).json(usuario);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = idParamSchema.parse(req.params);
            const data = updateUsuarioSchema.parse(req.body);

            const payload: any = {};
            if (data.cpf !== undefined) payload.cpf = data.cpf;
            if (data.nome !== undefined) payload.nome = data.nome;
            if (data.email !== undefined) payload.email = data.email;
            if (data.ativo !== undefined) payload.ativo = data.ativo;
            if (data.dataNascimento !== undefined)
                payload.dataNascimento = data.dataNascimento ? new Date(data.dataNascimento) : null;

            if (typeof data.senha === "string" && data.senha.trim()) {
                payload.senha = await bcrypt.hash(data.senha, 10);
            }

            if (data.telefone !== undefined) payload.telefone = data.telefone;
            if (data.localizacao !== undefined) payload.localizacao = data.localizacao;
            if (data.urlImagem !== undefined) payload.urlImagem = data.urlImagem;

            const atualizado = await this.usuarioService.update(BigInt(id), payload);
            res.status(200).json(atualizado);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = idParamSchema.parse(req.params);
            await this.usuarioService.delete(BigInt(id));
            res.status(204).send("Usuário deletado com sucesso");
        } catch (error) {
            next(error);
        }
    };
}
