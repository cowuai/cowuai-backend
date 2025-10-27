import { Request, Response } from "express";
import { errorHandler } from "../../middlewares/errorHandler";
import { inject, injectable } from "tsyringe";
import { AnimalService } from "./animal.service";

@injectable()
export class AnimalController {
  constructor(@inject(AnimalService) private animalService: AnimalService) {}

  create = async (req: Request, res: Response) => {
    try {
      const {
        nome,
        tipoRaca,
        sexo,
        composicaoRacial,
        dataNascimento,
        numeroParticularProprietario,
        registro,
        status,
        peso,
        idPai,
        idMae,
        idProprietario,
        idFazenda,
      } = req.body;

      const newAnimal = await this.animalService.create({
        nome,
        tipoRaca,
        sexo: sexo ?? null,
        composicaoRacial: composicaoRacial ?? null,
        dataNascimento: new Date(dataNascimento) ?? null,
        numeroParticularProprietario: numeroParticularProprietario ?? null,
        registro: registro ?? null,
        status: status,
        peso: peso ?? null,
        idPai: idPai ?? null,
        idMae: idMae ?? null,
        idProprietario: idProprietario ?? null,
        idFazenda,
        localizacao: "",
      });

      res.status(201).json(newAnimal);
    } catch (error) {
      errorHandler(error as Error, req, res, () => {});
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      // 1. Extrair e validar parâmetros de paginação
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;

      // Garantir que os valores são positivos
      if (page < 1 || pageSize < 1) {
        return res
          .status(400)
          .json({
            error:
              "Parâmetros de paginação (page, pageSize) devem ser positivos.",
          });
      }

      // 2. Chamar o serviço findAllPaginated (que agora existe no service)
      const { animals, total } = await this.animalService.findAllPaginated(
        page,
        pageSize
      );

      // 3. Calcular total de páginas
      const totalPages = Math.ceil(total / pageSize);

      // 4. Retornar a resposta estruturada que o frontend espera
      res.status(200).json({
        data: animals, // Chave "data" com o array
        pagination: {
          // Chave "pagination" com os metadados
          page,
          pageSize,
          totalItems: total,
          totalPages,
        },
      });
    } catch (error) {
      errorHandler(error as Error, req, res, () => {});
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID inválido" });
      }
      const animal = await this.animalService.findById(BigInt(id));
      res.status(200).json(animal);
    } catch (error) {
      errorHandler(error as Error, req, res, () => {});
    }
  };

  findByIdWithRelations = async (req: Request, res: Response) => {
    try {
      const { id, relation } = req.params;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID inválido" });
      }

      if (!["pais", "filhos", "vacinacoes"].includes(relation)) {
        return res.status(400).json({ error: "Relação inválida" });
      }

      const animal = await this.animalService.findByIdWithRelations(
        BigInt(id),
        relation
      );
      res.status(200).json(animal);
    } catch (error) {
      errorHandler(error as Error, req, res, () => {});
    }
  };

  findByProprietario = async (req: Request, res: Response) => {
    try {
      const { idProprietario } = req.params;
      if (!idProprietario || isNaN(Number(idProprietario))) {
        return res.status(400).json({ error: "ID de proprietário inválido" });
      }
      const animals = await this.animalService.findByProprietario(
        BigInt(idProprietario)
      );
      res.status(200).json(animals);
    } catch (error) {
      errorHandler(error as Error, req, res, () => {});
    }
  };

  findByFazenda = async (req: Request, res: Response) => {
    try {
      const { idFazenda } = req.params;
      if (!idFazenda || isNaN(Number(idFazenda))) {
        return res.status(400).json({ error: "ID de fazenda inválido" });
      }
      const animals = await this.animalService.findByFazenda(BigInt(idFazenda));
      res.status(200).json(animals);
    } catch (error) {
      errorHandler(error as Error, req, res, () => {});
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID inválido" });
      }
      const data = req.body;
      const updatedAnimal = await this.animalService.update(BigInt(id), data);
      res.status(200).json(updatedAnimal);
    } catch (error) {
      errorHandler(error as Error, req, res, () => {});
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID inválido" });
      }
      await this.animalService.delete(BigInt(id));
      res.status(204).send("Animal deletado com sucesso");
    } catch (error) {
      errorHandler(error as Error, req, res, () => {});
    }
  };
}
