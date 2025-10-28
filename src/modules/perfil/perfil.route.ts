import "reflect-metadata";
import {Router} from "express";
import {container} from "tsyringe";
import {PerfilController} from "./perfil.controller";
import {authMiddleware} from "../../middlewares/authMiddleware";

const router = Router();
const perfilController = container.resolve(PerfilController);

router.get("/", authMiddleware, perfilController.getProfileById);

export default router;