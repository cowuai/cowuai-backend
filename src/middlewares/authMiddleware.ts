import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {jwtConfig} from "../config/jwt";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {
        (req as any).user = jwt.verify(token, jwtConfig.secret);
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
}
