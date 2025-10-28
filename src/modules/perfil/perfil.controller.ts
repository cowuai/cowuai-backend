import { Request, Response } from "express";
import {inject, injectable} from "tsyringe";
import {PerfilService} from "./perfil.service";

@injectable()
export class PerfilController {
    constructor(
        @inject(PerfilService) private perfilService: PerfilService
    ) {}

    getProfileById = async (req: Request, res: Response) => {
        try {
            const { userId } = (req as any).user;

            // Lógica para obter o perfil pelo ID
            const profile = await this.perfilService.getProfileById(BigInt(userId));

            res.status(200).json({
                message: `Perfil do usuário com ID ${userId}`,
                profile: profile
            });
        }
        catch (error: any) {
            console.error("Erro ao obter perfil:", error);
            res.status(500).json({ message: error.message || "Erro interno no servidor." });
        }
    }
}