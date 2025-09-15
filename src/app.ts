import express from 'express';
import fazendaRoutes from "./modules/fazenda/fazenda.routes";
import { errorHandler } from './middlewares/errorHandler';
import { prisma } from './config/prisma';
import usuarioRoutes from "./modules/usuario/usuario.routes";

const app = express();

app.use(express.json());

// 👇 adiciona isso:
app.set(
  "json replacer",
  (_key: string, value: unknown) =>
    typeof value === "bigint" ? value.toString() : value
);

// Verifica se a conexão com o banco de dados está ok
app.get("/", async (req, res) => {
  try {
    await prisma.$connect();
    res.send("CowUai Backend funcionando 🚀 e banco de dados conectado! ✅");
  } catch (error) {
    res
      .status(500)
      .send("CowUai Backend funcionando, mas com erro no banco de dados. ❌");
  }
});

// Usa a rota de usuário para o caminho '/usuarios'
app.use("/usuarios", usuarioRoutes);

app.use("/fazendas", fazendaRoutes);

app.use(errorHandler);

export default app;