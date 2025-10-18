import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";

// Extende a interface Request para incluir a propriedade 'cookies'
interface CustomRequest extends Request {
  cookies: {
    refreshToken?: string;
  };
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token: string | undefined;

  // 1. TENTA OBTER DO HEADER 'Authorization: Bearer <token>' (Estrutura Futura)
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2. SE NÃO ENCONTRAR NO HEADER, TENTA OBTER DO COOKIE 'refreshToken' (Seu Bypass de Teste)
  // O cast para (req as CustomRequest) garante que a propriedade 'cookies' exista
  if (
    !token &&
    (req as CustomRequest).cookies &&
    (req as CustomRequest).cookies.refreshToken
  ) {
    token = (req as CustomRequest).cookies.refreshToken;
  } // 3. Verifica se um token foi encontrado em qualquer lugar

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    // Usa o token encontrado (seja do Header ou do Cookie)
    (req as any).user = jwt.verify(token, jwtConfig.secret);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
