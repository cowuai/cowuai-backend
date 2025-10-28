import { Router } from "express";
import { AuthController } from "./auth.controller";
import {container} from "tsyringe";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

const authController = container.resolve(AuthController);

router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authMiddleware, authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

export default router;
