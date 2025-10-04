import {TipoVacinaController} from "./tipoVacina.controller";
import {Router} from "express";
import {container} from "tsyringe";
import {authMiddleware} from "../../middlewares/authMiddleware";

const router = Router();
const tipoVacinaController = container.resolve(TipoVacinaController);

router.post("/", authMiddleware, tipoVacinaController.create);
router.get("/", authMiddleware, tipoVacinaController.findAll);
router.get("/id/:id", authMiddleware, tipoVacinaController.findById);
router.get("/nome/:nome", authMiddleware, tipoVacinaController.findByNome);
router.put("/:id", authMiddleware, tipoVacinaController.update);
router.delete("/:id", authMiddleware, tipoVacinaController.delete);

export default router;