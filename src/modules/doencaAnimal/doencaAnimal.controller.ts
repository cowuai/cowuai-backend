// src/modules/doencaAnimal/doencaAnimal.controller.ts
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { DoencaAnimalService } from "./doencaAnimal.services";

const createDoencaAnimalSchema = z.object({
  idAnimal: z
    .string()
    .regex(/^\d+$/, "idAnimal deve ser um número inteiro positivo"),
  idDoenca: z
    .string()
    .regex(/^\d+$/, "idDoenca deve ser um número inteiro positivo"),
  dataDiagnostico: z
    .string()
    .datetime({ message: "dataDiagnostico deve ser uma data válida ISO" }),
  emTratamento: z.boolean().optional(),
  dataFimTratamento: z
    .string()
    .datetime({ message: "dataFimTratamento deve ser uma data válida ISO" })
    .nullable()
    .optional(),
  observacoes: z.string().max(1000).nullable().optional(),
});

// Para rotas /animal/:idAnimal/doencas → o idAnimal vem da rota, não do body
const createDoencaAnimalForAnimalSchema = createDoencaAnimalSchema.omit({
  idAnimal: true,
});

const updateDoencaAnimalSchema = createDoencaAnimalSchema
  .omit({ idAnimal: true, idDoenca: true })
  .partial();

const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID deve ser um número inteiro positivo"),
});

const idAnimalParamSchema = z.object({
  idAnimal: z
    .string()
    .regex(/^\d+$/, "idAnimal deve ser um número inteiro positivo"),
});

@injectable()
export class DoencaAnimalController {
  constructor(
    @inject(DoencaAnimalService)
    private doencaAnimalService: DoencaAnimalService
  ) {}

  /**
   * Cria um novo registro de doença para um animal (body contém idAnimal)
   * Usada pela rota genérica /doencas-animal
   */
  create = async (req: Request, res: Response) => {
    try {
      const data = createDoencaAnimalSchema.parse(req.body);
      const registro = await this.doencaAnimalService.criar(data);
      return res.status(201).json(registro);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          error: "Dados inválidos",
          issues: err.issues,
        });
      }
      console.error("Erro ao criar registro de doença do animal:", err);
      return res.status(400).json({ error: err.message });
    }
  };

  /**
   * Cria um novo registro de doença para um animal específico
   * Rota esperada: POST /animal/:idAnimal/doencas
   * (idAnimal vem da rota, o body NÃO precisa conter idAnimal)
   */
  createForAnimal = async (req: Request, res: Response) => {
    try {
      const { idAnimal } = idAnimalParamSchema.parse(req.params);
      const body = createDoencaAnimalForAnimalSchema.parse(req.body);

      const registro = await this.doencaAnimalService.criar({
        idAnimal,
        ...body,
      });

      return res.status(201).json(registro);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          error: "Dados inválidos",
          issues: err.issues,
        });
      }
      console.error(
        "Erro ao criar registro de doença para o animal:",
        err
      );
      return res.status(400).json({ error: err.message });
    }
  };

  /**
   * Lista todas as doenças registradas para um animal
   * Usada por rotas que chamam: controller.findByAnimal
   */
  findByAnimal = async (req: Request, res: Response) => {
    try {
      const { idAnimal } = idAnimalParamSchema.parse(req.params);
      const registros = await this.doencaAnimalService.listarPorAnimal(
        idAnimal
      );
      return res.json(registros);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          error: "Parâmetros inválidos",
          issues: err.issues,
        });
      }
      console.error(
        "Erro ao listar registros de doença para o animal:",
        err
      );
      return res.status(400).json({ error: err.message });
    }
  };

  /**
   * Alias para compatibilizar com rotas que usam listByAnimal
   * (apenas delega para findByAnimal)
   */
  listByAnimal = this.findByAnimal;

  /**
   * Lista apenas as doenças ATIVAS para um animal (em tratamento ou sem data fim)
   * Pensada para rota: GET /animal/:idAnimal/doencas/ativas
   */
  listAtivasByAnimal = async (req: Request, res: Response) => {
    try {
      const { idAnimal } = idAnimalParamSchema.parse(req.params);
      const registros = await this.doencaAnimalService.listarPorAnimal(
        idAnimal
      );

      const ativos = (registros || []).filter((reg: any) => {
        // Ativo se:
        // - emTratamento === true  OU
        // - NÃO tem dataFimTratamento
        return reg.emTratamento || !reg.dataFimTratamento;
      });

      return res.json(ativos);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          error: "Parâmetros inválidos",
          issues: err.issues,
        });
      }
      console.error(
        "Erro ao listar registros de doença ATIVOS do animal:",
        err
      );
      return res.status(400).json({ error: err.message });
    }
  };

  /**
   * Busca um registro de doença do animal por ID
   */
  findById = async (req: Request, res: Response) => {
    try {
      const { id } = idParamSchema.parse(req.params);
      const registro = await this.doencaAnimalService.buscarPorId(id);
      return res.json(registro);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          error: "Parâmetros inválidos",
          issues: err.issues,
        });
      }
      if (err.message === "Registro de doença do animal não encontrado.") {
        return res.status(404).json({ error: err.message });
      }
      console.error("Erro ao buscar registro de doença do animal:", err);
      return res.status(400).json({ error: err.message });
    }
  };

  /**
   * Atualiza um registro de doença do animal
   */
  update = async (req: Request, res: Response) => {
    try {
      const { id } = idParamSchema.parse(req.params);
      const data = updateDoencaAnimalSchema.parse(req.body);

      const registro = await this.doencaAnimalService.atualizar(id, data);
      return res.json(registro);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          error: "Dados inválidos",
          issues: err.issues,
        });
      }
      if (err.message === "Registro de doença do animal não encontrado.") {
        return res.status(404).json({ error: err.message });
      }
      console.error("Erro ao atualizar registro de doença do animal:", err);
      return res.status(400).json({ error: err.message });
    }
  };

  /**
   * Remove um registro de doença do animal
   */
  delete = async (req: Request, res: Response) => {
    try {
      const { id } = idParamSchema.parse(req.params);
      await this.doencaAnimalService.remover(id);
      return res.status(204).send();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          error: "Parâmetros inválidos",
          issues: err.issues,
        });
      }
      if (err.message === "Registro de doença do animal não encontrado.") {
        return res.status(404).json({ error: err.message });
      }
      console.error("Erro ao remover registro de doença do animal:", err);
      return res.status(400).json({ error: err.message });
    }
  };
}
