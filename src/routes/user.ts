import { Router } from "express";
import userController from "../controllers/userController";
import userValidator from "../validators/user";
import authenticateUser from "../middleware/auth";
import authorizeAdmin from "../middleware/authorizeAdmin";

const router = Router();
router.get("/", authenticateUser, authorizeAdmin, userController.getAllUsers);
router.get("/:id", authenticateUser, userController.getUserById);
router.patch("/update/:id", authenticateUser, userValidator.updateValidator, userController.updateUser);

export default router;
