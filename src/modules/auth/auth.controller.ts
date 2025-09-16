import {Request, Response} from "express";
import {AuthService} from "./auth.service";
import {inject, injectable} from "tsyringe";

@injectable()
export class AuthController {
    constructor(@inject(AuthService) private authService: AuthService) {}

    login = async (req: Request, res: Response) => {
        try {
            const { email, senha } = req.body;
            const result = await this.authService.login(email, senha);
            return res.status(200).json(result);
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}