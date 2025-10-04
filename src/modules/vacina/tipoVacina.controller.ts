import {injectable, inject} from "tsyringe";
import {Request, Response} from "express";
import {TipoVacinaService} from "./tipoVacina.service";
import {errorHandler} from "../../middlewares/errorHandler";

@injectable()
export class TipoVacinaController {
    constructor(@inject(TipoVacinaService) private tipoVacinaService: TipoVacinaService) {
    }

    create = async (req: Request, res: Response) => {
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
            errorHandler(error as Error, req, res, () => {
                console.error("Erro ao criar vacina:", error);
                res.status(500).json({error: "Erro ao criar vacina"});
            });
        }
    }

    findAll = async (_req: Request, res: Response) => {
        try {
            const tiposVacina = await this.tipoVacinaService.findAll();
            res.status(200).json(tiposVacina);
        } catch (error) {
            errorHandler(error as Error, _req, res, () => {
                console.error("Erro ao buscar tipos de vacina:", error);
                res.status(500).json({error: "Erro ao buscar tipos de vacina"});
            });
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const tipoVacina = await this.tipoVacinaService.findById(BigInt(id));
            res.status(200).json(tipoVacina);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
                console.error("Erro ao buscar tipo de vacina por ID:", error);
                res.status(500).json({error: "Erro ao buscar tipo de vacina por ID"});
            });
        }
    }

    findByNome = async (req: Request, res: Response) => {
        try {
            const {nome} = req.params;
            const tipoVacina = await this.tipoVacinaService.findByNome(nome);
            res.status(200).json(tipoVacina);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
                console.error("Erro ao buscar tipo de vacina por nome:", error);
                res.status(500).json({error: "Erro ao buscar tipo de vacina por nome"});
            });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const data = req.body;
            const updatedTipoVacina = await this.tipoVacinaService.update(BigInt(id), data);
            res.status(200).json(updatedTipoVacina);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
                console.error("Erro ao atualizar tipo de vacina:", error);
                res.status(500).json({error: "Erro ao atualizar tipo de vacina"});
            });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            await this.tipoVacinaService.delete(BigInt(id));
            res.status(204).send();
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
                console.error("Erro ao deletar tipo de vacina:", error);
                res.status(500).json({error: "Erro ao deletar tipo de vacina"});
            });
        }
    }
}