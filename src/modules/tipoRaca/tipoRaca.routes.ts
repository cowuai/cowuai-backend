import {Router} from "express";
import {container} from "tsyringe";
import {TipoRacaController} from "./tipoRaca.controller";

const router = Router();
const tipoRacaController = container.resolve(TipoRacaController);

router.get("/", (req, res) => {
    try {
        const tiposRaca = tipoRacaController.findAll();
        res.json(tiposRaca);
    } catch (error) {
        res.status(500).json({error: (error as Error).message});
    }
});

export default router;