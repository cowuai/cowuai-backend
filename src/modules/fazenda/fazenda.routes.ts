import {Router} from "express";
import {fazendaController} from "./fazenda.controller";

const router = Router();

router.post("/", fazendaController.create);
router.get("/", fazendaController.findAll);
router.get("/id/:id", fazendaController.findById);
router.get("/nome/:nome", fazendaController.findByNome);
router.get("/proprietario/:idProprietario", fazendaController.findByIdProprietario);
router.put("/:id", fazendaController.update);
router.delete("/:id", fazendaController.delete);

export default router;