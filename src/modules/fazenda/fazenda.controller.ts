import {FazendaService} from "./fazenda.service";
import {Request, Response} from "express";
import {errorHandler} from "../../middlewares/errorHandler";
import {inject, injectable} from "tsyringe";

@injectable()
export class FazendaController {
    constructor(@inject(FazendaService) private fazendaService: FazendaService) {
    }

    create = async (req: Request, res: Response) => {
        try {
            const {
                idProprietario,
                nome,
                endereco,
                cidade,
                estado,
                pais,
                porte,
                afixo,
                prefixo,
                sufixo,
            } = req.body;

            const newFazenda = await this.fazendaService.create(
                {
                    idProprietario,
                    nome,
                    endereco,
                    cidade,
                    estado,
                    pais,
                    porte,
                    afixo,
                    prefixo,
                    sufixo
                });
            res.status(201).json(newFazenda);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
            });
        }
    }

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
            const {id} = req.params;
            const fazenda = await this.fazendaService.findById(BigInt(id));
            res.status(200).json(fazenda);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
            });
        }
    }

    findByNome = async (req: Request, res: Response) => {
        try {
            const {nome} = req.params;
            const fazenda = await this.fazendaService.findByNome(nome);
            res.status(200).json(fazenda);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
            });
        }
    }

    findByIdProprietario = async (req: Request, res: Response) => {
        try {
            const {idProprietario} = req.params;
            const fazendas = await this.fazendaService.findByIdProprietario(BigInt(idProprietario));
            res.status(200).json(fazendas);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
            });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const data = req.body;
            const updatedFazenda = await this.fazendaService.update(BigInt(id), data);
            res.status(200).json(updatedFazenda);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
            });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            await this.fazendaService.delete(BigInt(id));
            res.status(204).send("Fazenda deletada com sucesso");
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
            });
        }
    }
}