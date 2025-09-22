import { Router } from "express";
import { AuthController } from "./auth.controller";
import {container} from "tsyringe";

const router = Router();

const authController = container.resolve(AuthController);

router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

export default router;
