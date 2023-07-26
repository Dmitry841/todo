import Router from "express";
import UserController from "../controllers/userController.js";
import { roleChecker } from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post("/login", UserController.login);

export default router;
