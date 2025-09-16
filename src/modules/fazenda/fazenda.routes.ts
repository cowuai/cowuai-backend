import {Router} from "express";
import {FazendaController} from "./fazenda.controller";
import {authMiddleware} from "../../middlewares/authMiddleware";
import {container} from "tsyringe";

const router = Router();
const fazendaController = container.resolve(FazendaController);

router.post("/", authMiddleware, fazendaController.create);
router.get("/", authMiddleware, fazendaController.findAll);
router.get("/id/:id", authMiddleware, fazendaController.findById);
router.get("/nome/:nome", authMiddleware, fazendaController.findByNome);
router.get("/proprietario/:idProprietario", authMiddleware, fazendaController.findByIdProprietario);
router.put("/:id", authMiddleware, fazendaController.update);
router.delete("/:id", authMiddleware, fazendaController.delete);

export default router;