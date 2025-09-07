import express from 'express';
import fazendaRoutes from "./modules/fazenda/fazenda.routes";
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use("/fazendas", fazendaRoutes);

app.use(errorHandler);

export default app;