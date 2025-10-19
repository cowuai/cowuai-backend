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
import {errorHandler} from "./middlewares/errorHandler";
import {prisma} from "./config/prisma";
import cors from "cors";
import "./shared/container"; // Importa as configurações do container de injeção de dependências
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: [process.env.FRONTEND_URL || "http://localhost:3000"],
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
}));

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

app.use("/api/cadastro", cadastroRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/fazendas", fazendaRoutes);
app.use("/api/animais", animalRoutes);
app.use("/api/tipos-raca", tipoRacaRoutes);
app.use("/api/tipos-vacina", tipoVacinaRoutes);
app.use("/api/aplicacoes-vacina", aplicacaoVacinaRoutes);

app.use(errorHandler);

export default app;