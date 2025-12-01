import { FazendaService } from "./fazenda.service";
import { Request, Response } from "express";
import { errorHandler } from "../../middlewares/errorHandler";
import { inject, injectable } from "tsyringe";
import { z } from "zod";

// 📌 Schema para criar Fazenda (body)
const createFazendaSchema = z.object({
    nome: z
        .string()
        .min(1, "Nome da fazenda é obrigatório")
        .max(255, "Nome muito longo (máx. 255 caracteres)"),
    endereco: z
        .string()
        .min(1, "Endereço é obrigatório")
        .max(255, "Endereço muito longo (máx. 255 caracteres)"),
    cidade: z
        .string()
        .min(1, "Cidade é obrigatória")
        .max(255, "Cidade muito longa (máx. 255 caracteres)"),
    estado: z
        .string()
        .length(2, "Estado deve ser a sigla (ex: MG, SP)"),
    pais: z
        .string()
        .min(1, "País é obrigatório")
        .max(255, "País muito longo (máx. 255 caracteres)"),
    porte: z.enum(
        ["PEQUENO", "MEDIO", "GRANDE"],
        "Porte inválido. Use PEQUENO, MEDIO ou GRANDE."
    ),
    afixo: z
        .string()
        .max(255, "Afixo muito longo (máx. 255 caracteres)")
        .optional()
        .or(z.literal("")), // permite string vazia
    prefixo: z.boolean({
        message: "Valor inválido para prefixo",
    }),
    sufixo: z.boolean({
        message: "Valor inválido para sufixo",
    }),
}).superRefine((data, ctx) => {
    // Regra de negócio: se prefixo ou sufixo estiver true, afixo não pode ser vazio
    if ((data.prefixo || data.sufixo) && !(data.afixo ?? "").trim()) {
        ctx.addIssue({
            code: "custom",
            path: ["afixo"],
            message: "Informe o texto do afixo quando marcar prefixo ou sufixo.",
        });
    }
});

// 📌 Schema para update (todos os campos opcionais)
const updateFazendaSchema = createFazendaSchema.partial();

// 📌 Schema genérico para params com ID numérico
const idParamSchema = z.object({
    id: z
        .string()
        .regex(/^\d+$/, "ID deve ser um número inteiro positivo"),
});

const idProprietarioParamSchema = z.object({
    idProprietario: z
        .string()
        .regex(/^\d+$/, "idProprietario deve ser um número inteiro positivo"),
});

const nomeParamSchema = z.object({
    nome: z
        .string()
        .min(1, "Nome é obrigatório"),
});

@injectable()
export class FazendaController {
    constructor(@inject(FazendaService) private fazendaService: FazendaService) { }

    create = async (req: Request, res: Response) => {
        try {
            // 1) pega o userId do JWT (setado no authMiddleware)
            const user = (req as any).user;
            const userId = user?.userId;
            if (!userId) {
                return res.status(401).json({ error: "Usuário não autenticado" });
            }

            // 2) valida body com Zod
            const data = createFazendaSchema.parse(req.body);

            // 3) chama o service passando idProprietario a partir do token
            const newFazenda = await this.fazendaService.create({
                idProprietario: BigInt(userId),
                ...data,
            } as any);

            return res.status(201).json(newFazenda);
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({
                    error: "Dados inválidos para cadastro de fazenda",
                    issues: err.issues,
                });
            }

            // mantém o padrão atual usando o errorHandler
            errorHandler(err as Error, req, res, () => { });
        }
    };

    findAll = async (_req: Request, res: Response) => {
        try {
            const fazendas = await this.fazendaService.findAll();
            res.status(200).json(fazendas);
        } catch (error) {
            errorHandler(error as Error, _req, res, () => {
            });
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
            const { id } = idParamSchema.parse(req.params);
            const fazenda = await this.fazendaService.findById(BigInt(id));
            return res.status(200).json(fazenda);
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({
                    error: "Parâmetros inválidos",
                    issues: err.issues,
                });
            }
            errorHandler(err as Error, req, res, () => { });
        }
    };

    findByNome = async (req: Request, res: Response) => {
        try {
            const { nome } = nomeParamSchema.parse(req.params);
            const fazenda = await this.fazendaService.findByNome(nome);
            return res.status(200).json(fazenda);
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({
                    error: "Parâmetros inválidos",
                    issues: err.issues,
                });
            }
            errorHandler(err as Error, req, res, () => { });
        }
    };

    findByIdProprietario = async (req: Request, res: Response) => {
        try {
            const { idProprietario } = idProprietarioParamSchema.parse(req.params);
            const fazendas = await this.fazendaService.findByIdProprietario(
                BigInt(idProprietario)
            );
            return res.status(200).json(fazendas);
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({
                    error: "Parâmetros inválidos",
                    issues: err.issues,
                });
            }
            errorHandler(err as Error, req, res, () => { });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const { id } = idParamSchema.parse(req.params);
            const data = updateFazendaSchema.parse(req.body);

            const updatedFazenda = await this.fazendaService.update(BigInt(id), data);
            return res.status(200).json(updatedFazenda);
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({
                    error: "Dados inválidos para atualização de fazenda",
                    issues: err.issues,
                });
            }
            errorHandler(err as Error, req, res, () => { });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = idParamSchema.parse(req.params);
            await this.fazendaService.delete(BigInt(id));
            return res.status(204).send("Fazenda deletada com sucesso");
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({
                    error: "Parâmetros inválidos",
                    issues: err.issues,
                });
            }
            errorHandler(err as Error, req, res, () => { });
        }
    };
}