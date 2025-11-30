import "reflect-metadata";
import express from "express";
import fazendaRoutes from "./modules/fazenda/fazenda.routes";
import animalRoutes from "./modules/animal/animal.routes";
import authRoutes from "./modules/auth/auth.routes";
import tipoVacinaRoutes from "./modules/vacina/tipoVacina.routes";
import aplicacaoVacinaRoutes from "./modules/vacina/aplicacaoVacina.routes";
import tipoRacaRoutes from "./modules/tipoRaca/tipoRaca.routes";
import usuarioRoutes from "./modules/usuario/usuario.routes";
import cadastroRoutes from "./modules/cadastro/cadastro.route";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
import perfilRoutes from "./modules/perfil/perfil.route";
import doencaRoutes from "./modules/doenca/doenca.routes";
import doencaAnimalRoutes from "./modules/doencaAnimal/doencaAnimal.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { prisma } from "./config/prisma";
import cors from "cors";
import "./shared/container"; // Importa as configurações do container de injeção de dependências
import cookieParser from "cookie-parser";
// NOVAS IMPORTAÇÕES DO SWAGGER (Caminho corrigido!)
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swaggerConfig";

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(cookieParser());

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

// ROTAS DA API

app.use("/api/cadastro", cadastroRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/perfil", perfilRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/fazendas", fazendaRoutes);
app.use("/api/animais", animalRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tipos-raca", tipoRacaRoutes);
app.use("/api/tipos-vacina", tipoVacinaRoutes);
app.use("/api/aplicacoes-vacina", aplicacaoVacinaRoutes);
app.use("/api/doencas", doencaRoutes);
app.use("/api/doencas-animal", doencaAnimalRoutes);

// ROTA DA DOCUMENTAÇÃO DO SWAGGER (Adicionada aqui)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// MIDDLEWARE DE TRATAMENTO DE ERROS (Deve ser o último)
app.use(errorHandler);

export default app;
