import {AplicacaoVacinaController} from "./aplicacaoVacina.controller";
import {Router} from "express";
import {container} from "tsyringe";
import {authMiddleware} from "../../middlewares/authMiddleware";

const router = Router();
const aplicacaoVacinaController = container.resolve(AplicacaoVacinaController);

router.post("/", authMiddleware, aplicacaoVacinaController.create);
router.get("/", authMiddleware, aplicacaoVacinaController.findAll);
router.get("/id/:id", authMiddleware, aplicacaoVacinaController.findById);
router.get("/animal/:idAnimal", authMiddleware, aplicacaoVacinaController.findByIdAnimal);
router.put("/:id", authMiddleware, aplicacaoVacinaController.update);
router.delete("/:id", authMiddleware, aplicacaoVacinaController.delete);

export default router;