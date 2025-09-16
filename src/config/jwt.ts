export const jwtConfig = {
    secret: process.env.JWT_SECRET || "cwup9y5z7x!A%D*G-KaPdSgVkYp3s6v9y", // chave secreta padrão (não use em produção)
    expiresIn: 3600, // 1 hora em segundos
};