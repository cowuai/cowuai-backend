import {Request, Response} from "express";
import {errorHandler} from "../../middlewares/errorHandler";
import { usuarioService } from "./usuario.service";
import bcrypt from "bcrypt"; 


export const usuarioController = {

    create: async (req: Request, res: Response) => {
        try {
            const { cpf, nome, email, senha, dataNascimento, ativo } = req.body;
            const hashedPassword = await bcrypt.hash(senha, 10);

            const novoUsuario = await usuarioService.create({
                
                    cpf,
                    nome,
                    email,
                    senha: hashedPassword,
                    dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
                    ativo: ativo ?? true,
                },
            );

            res.status(201).json(novoUsuario);
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            res.status(500).json({ error: "Erro ao criar usuário" });
        }
    },

  // READ – todos
  findAll: async (_req: Request, res: Response) => {
    try {
      const usuarios = await usuarioService.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      errorHandler(error as Error, _req, res, () => {});
    }
  },

  // READ – por id
  findById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.findById(BigInt(id));
      res.status(200).json(usuario);
    } catch (error) {
      errorHandler(error as Error, req, res, () => {});
    }
  },

  // READ – por nome
  findByNome: async (req: Request, res: Response) => {
    try {
      const { nome } = req.params;
      const usuarios = await usuarioService.findByNome(nome);
      res.status(200).json(usuarios);
    } catch (error) {
      errorHandler(error as Error, req, res, () => {});
    }
  },

  // READ – por CPF
  findByCpf: async (req: Request, res: Response) => {
    try {
      const { cpf } = req.params;
      const usuario = await usuarioService.findByCpf(cpf);
      res.status(200).json(usuario);
    } catch (error) {
      errorHandler(error as Error, req, res, () => {});
    }
  },

  // READ – por Email
  findByEmail: async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
      const usuario = await usuarioService.findByEmail(email);
      res.status(200).json(usuario);
    } catch (error) {
      errorHandler(error as Error, req, res, () => {});
    }
  },
}