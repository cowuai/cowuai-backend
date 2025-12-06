import { FazendaService } from "./fazenda.service";
import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { z } from "zod";

import {
    createFazendaSchema,
    updateFazendaSchema,
    idParamSchema,
    idProprietarioParamSchema,
    nomeParamSchema,
} from "./fazenda.zodScheme";
@injectable()
export class FazendaController {
    constructor(@inject(FazendaService) private fazendaService: FazendaService) { }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // 1) pega o userId do JWT (setado no authMiddleware)
            const user = (req as any).user;
            const userId = user?.userId;

            if (!userId) {
                return res.status(401).json({ error: "Usuário não autenticado" });
            }

            // 2) valida body com Zod
            const data = createFazendaSchema.parse(req.body);

            // 3) chama o service passando idProprietario a partir do token
            const newFazenda = await this.fazendaService.create({
                idProprietario: BigInt(userId),
                ...data,
            } as any);

            return res.status(201).json(newFazenda);
        } catch (error) {
            next(error);
        }
    };

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fazendas = await this.fazendaService.findAll();
            return res.status(200).json(fazendas);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = idParamSchema.parse(req.params);
            const fazenda = await this.fazendaService.findById(BigInt(id));
            return res.status(200).json(fazenda);
        } catch (error) {
            next(error);
        }
    };

    findByNome = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { nome } = nomeParamSchema.parse(req.params);
            const fazenda = await this.fazendaService.findByNome(nome);
            return res.status(200).json(fazenda);
        } catch (error) {
            next(error);
        }
    };

    findByIdProprietario = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { idProprietario } = idProprietarioParamSchema.parse(req.params);
            const fazendas = await this.fazendaService.findByIdProprietario(BigInt(idProprietario));
            return res.status(200).json(fazendas);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = idParamSchema.parse(req.params);
            const data = updateFazendaSchema.parse(req.body);

            const updatedFazenda = await this.fazendaService.update(BigInt(id), data);
            return res.status(200).json(updatedFazenda);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = idParamSchema.parse(req.params);
            await this.fazendaService.delete(BigInt(id));
            return res.status(204).send("Fazenda deletada com sucesso");
        } catch (error) {
            next(error);
        }
    };
}
