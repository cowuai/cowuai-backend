import "reflect-metadata";
import express from "express";
import fazendaRoutes from "./modules/fazenda/fazenda.routes";
import animalRoutes from "./modules/animal/animal.routes";
import authRoutes from "./modules/auth/auth.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { prisma } from "./config/prisma";
import usuarioRoutes from "./modules/usuario/usuario.routes";
import cors from "cors";
import tipoRacaRoutes from "./modules/tipoRaca/tipoRaca.routes";
import "./shared/container"; // Importa as configurações do container de injeção de dependências
import cadastroRoutes from "./routes/cadastro.route";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3001",
  credentials: true,
}));

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
}));

app.use("/api/cadastro", cadastroRoutes);

// Verifica conexão
app.get("/", async (req, res) => {
  try {
    await prisma.$connect();
    res.send("CowUai Backend funcionando e banco de dados conectado! ✅");
  } catch (error) {
    res
      .status(500)
      .send("CowUai Backend funcionando, mas com erro no banco de dados. ❌");
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/fazendas", fazendaRoutes);
app.use("/api/animais", animalRoutes);
app.use("/api/tipos-raca", tipoRacaRoutes);

app.use(errorHandler);

export default app;