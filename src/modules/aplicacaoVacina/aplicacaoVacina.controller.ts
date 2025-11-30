import {AplicacaoVacinaService} from "./aplicacaoVacina.service";
import {Request, Response} from "express";
import {errorHandler} from "../../middlewares/errorHandler";
import {inject, injectable} from "tsyringe";

@injectable()
export class AplicacaoVacinaController {
    constructor(@inject(AplicacaoVacinaService) private aplicacaoVacinaService: AplicacaoVacinaService) {}

    create = async (req: Request, res: Response) => {
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
                idAnimal,
                idTipoVacina,
                dataAplicacao: new Date(dataAplicacao),
                proximaDose: proximaDose ? new Date(proximaDose) : null,
                numeroDose,
                lote: lote ?? null,
                veterinario: veterinario ?? null,
                observacoes: observacoes ?? null
            });

            res.status(201).json(newAplicacaoVacina);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
                console.error("Erro ao criar aplicação de vacina:", error);
                res.status(500).json({error: "Erro ao criar aplicação de vacina"});
            });
        }
    }

    findAll = async (_req: Request, res: Response) => {
        try {
            const aplicacoesVacina = await this.aplicacaoVacinaService.findAll();
            res.status(200).json(aplicacoesVacina);
        } catch (error) {
            errorHandler(error as Error, _req, res, () => {
                console.error("Erro ao buscar aplicações de vacina:", error);
                res.status(500).json({error: "Erro ao buscar aplicações de vacina"});
            });
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const aplicacaoVacina = await this.aplicacaoVacinaService.findById(BigInt(id));
            res.status(200).json(aplicacaoVacina);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
                console.error("Erro ao buscar aplicação de vacina:", error);
                res.status(500).json({error: "Erro ao buscar aplicação de vacina"});
            });
        }
    }

    findByIdAnimal = async (req: Request, res: Response) => {
        try {
            const {idAnimal} = req.params;
            const aplicacoesVacina = await this.aplicacaoVacinaService.findByIdAnimal(BigInt(idAnimal));
            res.status(200).json(aplicacoesVacina);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
                console.error("Erro ao buscar aplicações de vacina por animal:", error);
                res.status(500).json({error: "Erro ao buscar aplicações de vacina por animal"});
            });
        }
    }

    update = async (req: Request, res: Response) => {
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
            errorHandler(error as Error, req, res, () => {
                console.error("Erro ao atualizar aplicação de vacina:", error);
                res.status(500).json({error: "Erro ao atualizar aplicação de vacina"});
            });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            await this.aplicacaoVacinaService.delete(BigInt(id));
            res.status(204).send();
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
                console.error("Erro ao deletar aplicação de vacina:", error);
                res.status(500).json({error: "Erro ao deletar aplicação de vacina"});
            });
        }
    }
}