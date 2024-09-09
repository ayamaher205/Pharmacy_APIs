import { Router } from "express";
import authController from "../controllers/authController";
import userValidators from "../validators/user";
import authenticateUser from "../middleware/auth";

const router = Router();
router.post("/register", userValidators.registerValidator, authController.register);
router.post("/login", userValidators.loginValidator, authController.login);
router.post("/refresh", authenticateUser, authController.refresh);
export default router;
