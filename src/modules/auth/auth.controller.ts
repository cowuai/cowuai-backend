import {Request, Response} from "express";
import {AuthService} from "./auth.service";

const authService = new AuthService();

export class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const {email, senha} = req.body;
            const result = await authService.login(email, senha);
            return res.status(200).json(result);
        } catch (err: any) {
            return res.status(400).json({error: err.message});
        }
    }
}