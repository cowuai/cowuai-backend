// src/modules/doencaAnimal/doencaAnimal.controller.ts
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { DoencaAnimalService } from "./doencaAnimal.services";

/**
 * Schema base para criação de doença do animal
 * OBS: removemos .datetime() para aceitar "YYYY-MM-DD"
 * e usamos z.coerce.number() para aceitar número ou string no idDoenca.
 */
const createDoencaAnimalSchema = z.object({
  idAnimal: z
    .string()
    .regex(/^\d+$/, "idAnimal deve ser um número inteiro positivo"),

  // front envia Number(form.idDoenca), então usamos coerce.number()
  idDoenca: z.coerce
    .number()
    .int()
    .positive({ message: "idDoenca deve ser um número inteiro positivo" }),

  // vem como "2025-11-30" ou já definido pelo front
  dataDiagnostico: z.string().min(1, "dataDiagnostico é obrigatória"),

  emTratamento: z.boolean().optional(),

  // pode ser string "2025-12-01", null, ou ausente
  dataFimTratamento: z.string().nullable().optional(),

  observacoes: z.string().max(1000).nullable().optional(),
});

// Para rotas /doencas-animal/animal/:idAnimal → o idAnimal vem da rota
const createDoencaAnimalForAnimalSchema = createDoencaAnimalSchema.omit({
  idAnimal: true,
});

// Para update: não pode alterar idAnimal nem idDoenca
const updateDoencaAnimalSchema = createDoencaAnimalSchema
  .omit({ idAnimal: true, idDoenca: true })
  .partial();

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID deve ser um número inteiro positivo"),
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

      const registro = await this.doencaAnimalService.criar({
        idAnimal: data.idAnimal,
        idDoenca: String(data.idDoenca), // garante string
        dataDiagnostico: data.dataDiagnostico,
        emTratamento: data.emTratamento,
        dataFimTratamento: data.dataFimTratamento,
        observacoes: data.observacoes,
      });

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
   * Rota esperada: POST /doencas-animal/animal/:idAnimal
   * (idAnimal vem da rota, o body NÃO precisa conter idAnimal)
   */
  createForAnimal = async (req: Request, res: Response) => {
    try {
      const { idAnimal } = idAnimalParamSchema.parse(req.params);
      const body = createDoencaAnimalForAnimalSchema.parse(req.body);

      const registro = await this.doencaAnimalService.criar({
        idAnimal,
        idDoenca: String(body.idDoenca),
        dataDiagnostico: body.dataDiagnostico,
        emTratamento: body.emTratamento,
        dataFimTratamento: body.dataFimTratamento,
        observacoes: body.observacoes,
      });

      return res.status(201).json(registro);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          error: "Dados inválidos",
          issues: err.issues,
        });
      }
      console.error("Erro ao criar registro de doença para o animal:", err);
      return res.status(400).json({ error: err.message });
    }
  };

  /**
   * Lista todas as doenças registradas para um animal
   * Usada por rotas que chamam: controller.findByAnimal
   * e também pelo alias listByAnimal
   */
  findByAnimal = async (req: Request, res: Response) => {
    try {
      const { idAnimal } = idAnimalParamSchema.parse(req.params);
      const registros = await this.doencaAnimalService.listarPorAnimal(
        idAnimal
      );

      // Se quiser manter 404 quando não tiver nada:
      if (!registros || registros.length === 0) {
        return res.status(404).json({
          error: `Nenhuma doença encontrada para o animal ${idAnimal}`,
        });
      }

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
   */
  listByAnimal = this.findByAnimal;

  /**
   * Lista apenas as doenças ATIVAS para um animal
   * (emTratamento = true ou sem dataFimTratamento)
   */
  listAtivasByAnimal = async (req: Request, res: Response) => {
    try {
      const { idAnimal } = idAnimalParamSchema.parse(req.params);
      const registros = await this.doencaAnimalService.listarPorAnimal(
        idAnimal
      );

      const ativos = (registros || []).filter((reg: any) => {
        return reg.emTratamento || !reg.dataFimTratamento;
      });

      if (!ativos || ativos.length === 0) {
        return res.status(404).json({
          error: `Nenhuma doença ativa encontrada para o animal ${idAnimal}`,
        });
      }

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
