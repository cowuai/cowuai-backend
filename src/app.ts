import 'reflect-metadata';
import express from 'express';
import fazendaRoutes from "./modules/fazenda/fazenda.routes";
import authRoutes from "./modules/auth/auth.routes";
import {errorHandler} from './middlewares/errorHandler';
import {prisma} from './config/prisma';
import usuarioRoutes from "./modules/usuario/usuario.routes";

// Importa as configurações do container de injeção de dependências
import "./shared/container";

const app = express();
app.use(express.json());

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

app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/fazendas", fazendaRoutes);

app.use(errorHandler);

export default app;