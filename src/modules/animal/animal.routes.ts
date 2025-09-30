import { Router } from "express";
import { AnimalController } from "./animal.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { container } from "tsyringe";

const router = Router();
const animalController = container.resolve(AnimalController);

router.post("/", authMiddleware, animalController.create);
router.get("/", authMiddleware, animalController.findAll);
router.get("/id/:id", authMiddleware, animalController.findById);
router.get("/proprietario/:idProprietario", authMiddleware, animalController.findByProprietario);
router.get("/fazenda/:idFazenda", authMiddleware, animalController.findByFazenda);
router.put("/:id", authMiddleware, animalController.update);
router.delete("/:id", authMiddleware, animalController.delete);

export default router;
