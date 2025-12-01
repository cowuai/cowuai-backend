import {AplicacaoVacinaService} from "./aplicacaoVacina.service";
import {Request, Response, NextFunction} from "express";
import {inject, injectable} from "tsyringe";

@injectable()
export class AplicacaoVacinaController {
    constructor(@inject(AplicacaoVacinaService) private aplicacaoVacinaService: AplicacaoVacinaService) {}

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                idAnimal,
                idTipoVacina,
                dataAplicacao,
                proximaDose,
                numeroDose,
                lote,
                veterinario,
                observacoes
            } = req.body;

            const newAplicacaoVacina = await this.aplicacaoVacinaService.create({
                idAnimal: BigInt(idAnimal),
                idTipoVacina: BigInt(idTipoVacina),
                dataAplicacao: new Date(dataAplicacao),
                proximaDose: proximaDose ? new Date(proximaDose) : null,
                numeroDose,
                lote: lote ?? null,
                veterinario: veterinario ?? null,
                observacoes: observacoes ?? null
            });

            res.status(201).json(newAplicacaoVacina);
        } catch (error) {
            next(error);
        }
    }

    findAll = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const aplicacoesVacina = await this.aplicacaoVacinaService.findAll();
            res.status(200).json(aplicacoesVacina);
        } catch (error) {
            next(error);
        }
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const aplicacaoVacina = await this.aplicacaoVacinaService.findById(BigInt(id));
            res.status(200).json(aplicacaoVacina);
        } catch (error) {
            next(error);
        }
    }

    findByIdAnimal = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {idAnimal} = req.params;
            const aplicacoesVacina = await this.aplicacaoVacinaService.findByIdAnimal(BigInt(idAnimal));
            res.status(200).json(aplicacoesVacina);
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const data = req.body;
            if (data.dataAplicacao) {
                data.dataAplicacao = new Date(data.dataAplicacao);
            }
            if (data.proximaDose) {
                data.proximaDose = new Date(data.proximaDose);
            }
            const updatedAplicacaoVacina = await this.aplicacaoVacinaService.update(BigInt(id), data);
            res.status(200).json(updatedAplicacaoVacina);
        } catch (error) {
            next(error);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            await this.aplicacaoVacinaService.delete(BigInt(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}