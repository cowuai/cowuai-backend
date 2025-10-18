export const jwtConfig = {
  // Definimos a chave forte como o fallback para garantir o alinhamento
  secret: process.env.JWT_SECRET || "MinhaChaveSecretaMuitoForte!1234",
  expiresIn: 3600,
};
