import { Router } from "express";
import authController from "../controllers/authController";
import userValidators from "../validators/user";

const router = Router();
router.post("/register", userValidators.registerValidator, authController.register);
router.post("/login", userValidators.loginValidator, authController.login);
router.post("/refresh", authController.refresh);
export default router;
