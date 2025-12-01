import { Request, Response, NextFunction } from "express";
import { ApiError } from "../types/ApiError";
import {ZodError} from "zod";

export function errorHandler(err: Error | ApiError, _req: Request, res: Response, _next: NextFunction) {
    console.error(err);

    if (err instanceof ZodError) {
        return res.status(400).json({
            message: "Erro de validação",
            errors: err.issues.map(issue => ({
                issue: issue,
                message: message,
            }))
        });
    }

    const status = (err instanceof ApiError) ? err.status : 500;
    const message = (process.env.NODE_ENV === "production" && status === 500)
        ? "Erro interno no servidor"
        : err.message;

    res.status(status).json({ message });
}