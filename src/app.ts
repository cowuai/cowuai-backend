import express from 'express';
import fazendaRoutes from "./modules/fazenda/fazenda.routes";
import authRoutes from "./modules/auth/auth.routes";
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use("auth", authRoutes);
app.use("/fazendas", fazendaRoutes);

app.use(errorHandler);

export default app;