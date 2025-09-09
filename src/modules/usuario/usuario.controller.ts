import {Request, Response} from "express";
import {errorHandler} from "../../middlewares/errorHandler";

export const usuarioController = {

    create: async (req: Request, res: Response) => {
        try {
            const { cpf, nome, email, senha, dataNascimento, ativo } = req.body;

            const novoUsuario = await usuarioService.create({
                data: {
                    cpf,
                    nome,
                    email,
                    senha,
                    dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
                    ativo: ativo ?? true,
                },
            });

            res.status(201).json(novoUsuario);
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            res.status(500).json({ error: "Erro ao criar usuário" });
        }
    }
}