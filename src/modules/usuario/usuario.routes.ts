import { UsuarioController } from "./usuario.controller";
import {authMiddleware} from "../../middlewares/authMiddleware";
import express from "express";
import {container} from "tsyringe";

const router = express.Router();
const usuarioController = container.resolve(UsuarioController);

router.post("/", usuarioController.create);
router.get("/", authMiddleware, usuarioController.findAll);
router.get("/id/:id", authMiddleware, usuarioController.findById);
router.get("/nome/:nome", authMiddleware, usuarioController.findByNome);
router.get("/cpf/:cpf", authMiddleware, usuarioController.findByCpf);
router.get("/email/:email", authMiddleware, usuarioController.findByEmail);

export default router;
