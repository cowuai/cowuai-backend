import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../../middlewares/errorHandler";
import { UsuarioService } from "./usuario.service";
import bcrypt from "bcrypt";
import { AuthService } from "../auth/auth.service";
import { inject, injectable } from "tsyringe";
import { createUsuarioSchema, updateUsuarioSchema, idParamSchema, nomeParamSchema, cpfParamSchema, emailParamSchema } from "./usuario.zodScheme";

// zod schemas moved to `usuario.zodScheme.ts`

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
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
