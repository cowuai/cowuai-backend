import {Router} from "express";
import {container} from "tsyringe";
import {TipoRacaController} from "./tipoRaca.controller";
import {authMiddleware} from "../../middlewares/authMiddleware";

const router = Router();
const tipoRacaController = container.resolve(TipoRacaController);

router.get("/", authMiddleware, (req, res) => {
    try {
        const tiposRaca = tipoRacaController.findAll();
        res.json(tiposRaca);
    } catch (error) {
        res.status(500).json({error: (error as Error).message});
    }
});

export default router;