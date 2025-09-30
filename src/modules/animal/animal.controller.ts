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
                composicaoRacial,
                dataNascimento,
                numeroParticularProprietario,
                registro,
                status,
                peso,
                idPai,
                idMae,
                idProprietario,
                idFazenda
            } = req.body;

            const newAnimal = await this.animalService.create({
                nome,
                tipoRaca,
                composicaoRacial: composicaoRacial ?? null,
                dataNascimento: dataNascimento ?? null,
                numeroParticularProprietario: numeroParticularProprietario ?? null,
                registro: registro ?? null,
                status: status ?? null,
                peso: peso ?? null,
                idPai: idPai ?? null,
                idMae: idMae ?? null,
                idProprietario: idProprietario ?? null,
                idFazenda
            });

            res.status(201).json(newAnimal);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {});
        }
    }

    findAll = async (_req: Request, res: Response) => {
        try {
            const animals = await this.animalService.findAll();
            res.status(200).json(animals);
        } catch (error) {
            errorHandler(error as Error, _req, res, () => {});
        }
    }

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
    }

    findByProprietario = async (req: Request, res: Response) => {
        try {
            const { idProprietario } = req.params;
            if (!idProprietario || isNaN(Number(idProprietario))) {
                return res.status(400).json({ error: "ID de proprietário inválido" });
            }
            const animals = await this.animalService.findByProprietario(BigInt(idProprietario));
            res.status(200).json(animals);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {});
        }
    }

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
    }

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
    }

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
    }
}
