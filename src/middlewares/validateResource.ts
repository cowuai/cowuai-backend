import { Request, Response, NextFunction } from "express";
import {ZodObject, ZodError } from "zod";

export const validateResource = (schema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Valida body, query e params de uma vez só
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      // Formata o erro para ficar bonito no Frontend
      return res.status(400).json({
        status: "error",
        message: "Erro de validação",
        errors: error.issues.map((err) => ({
          field: err.path.join("."), // Ex: "body.email"
          message: err.message,      // Ex: "E-mail inválido"
        })),
      });
    }
    return res.status(500).json({ status: "error", message: "Erro interno" });
  }
};