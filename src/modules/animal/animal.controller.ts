import {Request, Response, NextFunction} from "express";
import {inject, injectable} from "tsyringe";
import {AnimalService} from "./animal.service";

@injectable()
export class AnimalController {
    constructor(@inject(AnimalService) private animalService: AnimalService) {
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // O Zod já validou, converteu datas e checou campos obrigatórios.
            // Podemos passar o req.body direto para o serviço.
            const newAnimal = await this.animalService.create(req.body);

            res.status(201).json(newAnimal);
        } catch (error) {
            next(error);
        }
    };

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validar parâmetros de paginação (Query params são strings por padrão)
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 10;

            if (page < 1 || pageSize < 1) {
                return res.status(400).json({
                    error:
                        "Parâmetros de paginação (page, pageSize) devem ser positivos.",
                });
            }

            const {animals, total} = await this.animalService.findAllPaginated(
                page,
                pageSize
            );

            const totalPages = Math.ceil(total / pageSize);

            res.status(200).json({
                data: animals,
                pagination: {
                    page,
                    pageSize,
                    totalItems: total,
                    totalPages,
                },
            });
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            // O Zod já garantiu que o ID é numérico na rota, mas precisamos converter para BigInt
            const animal = await this.animalService.findById(BigInt(id));

            res.status(200).json(animal);
        } catch (error) {
            next(error);
        }
    };

    findByIdWithRelations = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id, relation} = req.params;

            // Validação manual simples para a ‘string’ de relação (Zod valida IDs, mas essa string específica pode ser checada aqui ou num schema específico)
            if (!["pais", "filhos", "vacinacoes"].includes(relation)) {
                return res
                    .status(400)
                    .json({error: "Relação inválida. Use: pais, filhos ou vacinacoes"});
            }

            const animal = await this.animalService.findByIdWithRelations(
                BigInt(id),
                relation
            );
            res.status(200).json(animal);
        } catch (error) {
            next(error);
        }
    };

    findByProprietarioPaginated = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {idProprietario} = req.params;
            const {page, pageSize} = req.query;

            // Validar parâmetros de paginação (Query params são ‘strings’ por padrão)
            const pageNum = parseInt(page as string) || 1;
            const pageSizeNum = parseInt(pageSize as string) || 10;

            if (pageNum < 1 || pageSizeNum < 1) {
                return res.status(400).json({
                    error:
                        "Parâmetros de paginação (page, pageSize) devem ser positivos.",
                });
            }

            const {animals, total} = await this.animalService.findByProprietarioPaginated(
                BigInt(idProprietario),
                pageNum,
                pageSizeNum
            );

            const totalPages = Math.ceil(total / pageSizeNum);

            res.status(200).json({
                data: animals,
                pagination: {
                    page: pageNum,
                    pageSize: pageSizeNum,
                    totalItems: total,
                    totalPages: totalPages,
                },
            });

        } catch (error) {
            next(error);
        }
    };

    findByFazenda = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {idFazenda} = req.params;
            const animals = await this.animalService.findByFazenda(BigInt(idFazenda));
            res.status(200).json(animals);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            // O Zod já limpou o body, deixando apenas os campos válidos
            const updatedAnimal = await this.animalService.update(
                BigInt(id),
                req.body
            );

            res.status(200).json(updatedAnimal);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            await this.animalService.delete(BigInt(id));
            res.status(204).send(); // 204 No Content é padrão para delete com sucesso
        } catch (error) {
            next(error);
        }
    };
}
