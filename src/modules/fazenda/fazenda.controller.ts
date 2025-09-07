import {fazendaService} from "./fazenda.service";
import {Request, Response} from "express";
import {errorHandler} from "../../middlewares/errorHandler";

export const fazendaController = {
    create: async (req: Request, res: Response) => {
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
            const newFazenda = await fazendaService.create(
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
            errorHandler(error as Error, req, res, () => {});
        }
    },
    findAll: async (_req: Request, res: Response) => {
        try {
            const fazendas = await fazendaService.findAll();
            res.status(200).json(fazendas);
        } catch (error) {
            errorHandler(error as Error, _req, res, () => {});
        }
    },
    findById: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const fazenda = await fazendaService.findById(BigInt(id));
            res.status(200).json(fazenda);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {});
        }
    },
    findByNome: async (req: Request, res: Response) => {
        try {
            const {nome} = req.params;
            const fazenda = await fazendaService.findByNome(nome);
            res.status(200).json(fazenda);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {});
        }
    },
    findByIdProprietario: async (req: Request, res: Response) => {
        try {
            const {idProprietario} = req.params;
            const fazendas = await fazendaService.findByIdProprietario(BigInt(idProprietario));
            res.status(200).json(fazendas);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {});
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const data = req.body;
            const updatedFazenda = await fazendaService.update(BigInt(id), data);
            res.status(200).json(updatedFazenda);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {});
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            await fazendaService.delete(BigInt(id));
            res.status(204).send();
        } catch (error) {
            errorHandler(error as Error, req, res, () => {});
        }
    }
}