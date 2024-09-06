import { Router } from "express";
import userController from "../controllers/userController";
import userValidator from "../validators/user";

const router = Router();
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.patch("/update/:id", userValidator.updateValidator, userController.updateUser);

export default router;
