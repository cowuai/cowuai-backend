import { Router } from "express";
import { getDashboardData } from "./dashboard.controller";
import {authMiddleware} from "../../middlewares/authMiddleware";

const router = Router();

// Rota para obter dados agregados do dashboard
router.get("/", authMiddleware, getDashboardData);

export default router;