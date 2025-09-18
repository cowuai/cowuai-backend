import {Router} from "express";
import { usuarioController } from "./usuario.controller";
import { authMiddleware } from "../../middlewares/authMiddleware"; 

const express = require("express");
const router = express.Router();

router.post("/", usuarioController.create);
router.get("/", authMiddleware, usuarioController.findAll);
router.get("/id/:id", authMiddleware, usuarioController.findById);
router.get("/nome/:nome", authMiddleware, usuarioController.findByNome);
router.get("/cpf/:cpf", authMiddleware, usuarioController.findByCpf);
router.get("/email/:email", authMiddleware, usuarioController.findByEmail);
router.put("/:id", authMiddleware, usuarioController.update);
router.delete("/:id", authMiddleware, usuarioController.delete);

export default router;
