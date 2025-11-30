// src/modules/doenca/doenca.controller.ts
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { DoencaService } from "./doenca.service";
import { z } from "zod";

const createDoencaSchema = z.object({
  nome: z.string().min(1, "Nome da doença é obrigatório").max(255),
  descricao: z.string().max(1000).optional().nullable(),
  ehCronica: z.boolean().optional(),
});

const updateDoencaSchema = createDoencaSchema.partial();

const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID deve ser um número inteiro positivo"),
});

@injectable()
export class DoencaController {
  constructor(@inject(DoencaService) private doencaService: DoencaService) {}

  /**
   * Cria uma nova doença
   */
  create = async (req: Request, res: Response) => {
    try {
      const data = createDoencaSchema.parse(req.body);
      const doenca = await this.doencaService.create(data);
      return res.status(201).json(doenca);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          error: "Dados inválidos",
          issues: err.issues,
        });
      }
      console.error("Erro ao criar doença:", err);
      return res.status(400).json({ error: err.message });
    }
  };

  /**
   * Lista todas as doenças
   */
  findAll = async (_req: Request, res: Response) => {
    try {
      const doencas = await this.doencaService.findAll();
      return res.json(doencas);
    } catch (err: any) {
      console.error("Erro ao listar doenças:", err);
      return res.status(500).json({ error: "Erro ao listar doenças" });
    }
  };

  /**
   * Busca uma doença por ID
   */
  findById = async (req: Request, res: Response) => {
    try {
      const { id } = idParamSchema.parse(req.params);
      const doenca = await this.doencaService.findById(BigInt(id));
      return res.json(doenca);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          error: "Parâmetros inválidos",
          issues: err.issues,
        });
      }
      if (err.message === "Doença não encontrada.") {
        return res.status(404).json({ error: err.message });
      }
      console.error("Erro ao buscar doença:", err);
      return res.status(400).json({ error: err.message });
    }
  };

  /**
   * Atualiza uma doença
   */
  update = async (req: Request, res: Response) => {
    try {
      const { id } = idParamSchema.parse(req.params);
      const data = updateDoencaSchema.parse(req.body);
      const doenca = await this.doencaService.update(BigInt(id), data);
      return res.json(doenca);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          error: "Dados inválidos",
          issues: err.issues,
        });
      }
      if (err.message === "Doença não encontrada.") {
        return res.status(404).json({ error: err.message });
      }
      console.error("Erro ao atualizar doença:", err);
      return res.status(400).json({ error: err.message });
    }
  };

  /**
   * Remove uma doença
   */
  delete = async (req: Request, res: Response) => {
    try {
      const { id } = idParamSchema.parse(req.params);
      await this.doencaService.delete(BigInt(id));
      return res.status(204).send();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          error: "Parâmetros inválidos",
          issues: err.issues,
        });
      }
      if (err.message === "Doença não encontrada.") {
        return res.status(404).json({ error: err.message });
      }
      console.error("Erro ao remover doença:", err);
      return res.status(400).json({ error: err.message });
    }
  };
}
