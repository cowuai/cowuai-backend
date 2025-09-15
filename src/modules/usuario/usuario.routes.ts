import {Router} from "express";
import { usuarioController } from "./usuario.controller";
const express = require("express");
const router = express.Router();

router.post("/", usuarioController.create);
router.get("/", usuarioController.findAll);
router.get("/id/:id", usuarioController.findById);
router.get("/nome/:nome", usuarioController.findByNome);
router.get("/cpf/:cpf", usuarioController.findByCpf);
router.get("/email/:email", usuarioController.findByEmail);

export default router;
