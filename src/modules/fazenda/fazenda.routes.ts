import {Router} from "express";
import {fazendaController} from "./fazenda.controller";
import {authMiddleware} from "../../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, fazendaController.create);
router.get("/", authMiddleware, fazendaController.findAll);
router.get("/id/:id", authMiddleware, fazendaController.findById);
router.get("/nome/:nome", authMiddleware, fazendaController.findByNome);
router.get("/proprietario/:idProprietario", authMiddleware, fazendaController.findByIdProprietario);
router.put("/:id", authMiddleware, fazendaController.update);
router.delete("/:id", authMiddleware, fazendaController.delete);

export default router;