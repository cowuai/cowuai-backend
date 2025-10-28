import { Router } from "express";
import { getDashboardData } from "./dashboard.controller";

const router = Router();

// Rota para obter dados agregados do dashboard
router.get("/", getDashboardData);

export default router;