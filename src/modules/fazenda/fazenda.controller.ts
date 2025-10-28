import {FazendaService} from "./fazenda.service";
import {Request, Response, NextFunction} from "express";
import {errorHandler} from "../../middlewares/errorHandler";
import {inject, injectable} from "tsyringe";

@injectable()
export class FazendaController {
    constructor(@inject(FazendaService) private fazendaService: FazendaService) {
    }

    create = async (req: Request, res: Response) => {
        try {
            // 1) pega o userId do JWT (setado no authMiddleware)
            const user = (req as any).user;
            const userId = user?.userId;
            if (!userId) {
                return res.status(401).json({error: "Usuário não autenticado"});
            }

            // 2) pega os campos do body
            let {
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

            // 3) validação dos obrigatórios (conforme schema atual)
            const faltando: string[] = [];
            if (!nome) faltando.push("nome");
            if (!endereco) faltando.push("endereco");
            if (!cidade) faltando.push("cidade");
            if (!estado) faltando.push("estado");
            if (!pais) faltando.push("pais");
            if (porte === undefined || porte === null) faltando.push("porte");
            if (afixo === undefined || afixo === null) faltando.push("afixo");
            if (prefixo === undefined || prefixo === null) faltando.push("prefixo");
            if (sufixo === undefined || sufixo === null) faltando.push("sufixo");

            if (faltando.length) {
                return res.status(400).json({error: `Campos obrigatórios: ${faltando.join(", ")}`});
            }

            // 4) chama o service passando idProprietario a partir do token
            const newFazenda = await this.fazendaService.create({
                idProprietario: BigInt(userId),
                nome,
                endereco,
                cidade,
                estado,
                pais,
                porte,    // valores aceitos: "PEQUENO" | "MEDIO" | "GRANDE"
                afixo,    // string
                prefixo,  // boolean
                sufixo,   // boolean
            } as any);

            res.status(201).json(newFazenda);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {
            });
        }
    };

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