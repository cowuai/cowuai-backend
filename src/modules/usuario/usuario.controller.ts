import {Request, Response} from "express";
import {errorHandler} from "../../middlewares/errorHandler";
import {UsuarioService} from "./usuario.service";
import bcrypt from "bcrypt";
import {AuthService} from "../auth/auth.service";
import {inject, injectable} from "tsyringe";

@injectable()
export class UsuarioController {
    constructor(
        @inject(UsuarioService) private usuarioService: UsuarioService,
        @inject(AuthService) private authService: AuthService
    ) {}

    // CREATE
    create = async (req: Request, res: Response) => {
        try {
            const {cpf, nome, email, senha, dataNascimento, ativo} = req.body;
            const hashedPassword = await bcrypt.hash(senha, 10);

            await this.usuarioService.create({
                    cpf,
                    nome,
                    email,
                    senha: hashedPassword,
                    dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
                    ativo: ativo ?? true,
                },
            );

            const loggedUserWithToken = await this.authService.login(email, senha);

            res.status(201).json(loggedUserWithToken);
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            res.status(500).json({error: "Erro ao criar usuário"});
        }
    }

    // READ – todos
    findAll = async (_req: Request, res: Response) => {
        try {
            const usuarios = await this.usuarioService.findAll();
            res.status(200).json(usuarios);
        } catch (error) {
            errorHandler(error as Error, _req, res, () => {
            });
        }
    }

    // READ – por id
    findById = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const usuario = await this.usuarioService.findById(BigInt(id));
            res.status(200).json(usuario);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
            });
        }
    }

    // READ – por nome
    findByNome = async (req: Request, res: Response) => {
        try {
            const {nome} = req.params;
            const usuarios = await this.usuarioService.findByNome(nome);
            res.status(200).json(usuarios);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
            });
        }
    }

    // READ – por CPF
    findByCpf = async (req: Request, res: Response) => {
        try {
            const {cpf} = req.params;
            const usuario = await this.usuarioService.findByCpf(cpf);
            res.status(200).json(usuario);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
            });
        }
    }

    // READ – por Email
    findByEmail = async (req: Request, res: Response) => {
        try {
            const {email} = req.params;
            const usuario = await this.usuarioService.findByEmail(email);
            res.status(200).json(usuario);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
            });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = BigInt(req.params.id);
            const {cpf, nome, email, senha, dataNascimento, ativo} = req.body;
            const payload: any = {};
            if (cpf !== undefined) payload.cpf = cpf;
            if (nome !== undefined) payload.nome = nome;
            if (email !== undefined) payload.email = email;
            if (ativo !== undefined) payload.ativo = ativo;
            if (dataNascimento !== undefined) payload.dataNascimento = dataNascimento ? new Date(dataNascimento) : null;
            if (typeof senha === "string" && senha.trim()) {
                payload.senha = await bcrypt.hash(senha, 10);
            }
            const atualizado = await this.usuarioService.update(id, payload);
            res.status(200).json(atualizado);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
            });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            await this.usuarioService.delete(BigInt(req.params.id));
            res.status(204).send();
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
            });
        }
    }

}