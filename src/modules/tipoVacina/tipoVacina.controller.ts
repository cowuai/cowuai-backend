import {injectable, inject} from "tsyringe";
import {Request, Response, NextFunction} from "express";
import {TipoVacinaService} from "./tipoVacina.service";

@injectable()
export class TipoVacinaController {
    constructor(@inject(TipoVacinaService) private tipoVacinaService: TipoVacinaService) {
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                nome,
                descricao,
                obrigatoria,
                generoAlvo,
                minIdadeMeses,
                maxIdadeMeses,
                frequencia
            } = req.body;

            const newTipoVacina = await this.tipoVacinaService.create({
                nome,
                descricao,
                obrigatoria,
                generoAlvo,
                minIdadeMeses,
                maxIdadeMeses,
                frequencia
            });

            res.status(201).json(newTipoVacina);
        } catch (error) {
            next(error);
        }
    }

    findAll = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Requisição recebida para buscar todos os tipos de vacina");
            const tiposVacina = await this.tipoVacinaService.findAll();
            res.status(200).json(tiposVacina);
        } catch (error) {
            next(error);
        }
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const tipoVacina = await this.tipoVacinaService.findById(BigInt(id));
            res.status(200).json(tipoVacina);
        } catch (error) {
            next(error);
        }
    }

    findByNome = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {nome} = req.params;
            const tipoVacina = await this.tipoVacinaService.findByNome(nome);
            res.status(200).json(tipoVacina);
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const data = req.body;
            const updatedTipoVacina = await this.tipoVacinaService.update(BigInt(id), data);
            res.status(200).json(updatedTipoVacina);
        } catch (error) {
            next(error);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            await this.tipoVacinaService.delete(BigInt(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}