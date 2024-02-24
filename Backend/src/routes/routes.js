// Import necessary modules
import { Router } from "express";
import { registerController } from "../controllers/user/register.controller.js";
import { loginController } from "../controllers/user/login.controller.js";
import { forgotPassword } from "../controllers/user/forgetPassword.controller.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController)
router.post("/forgot-password", forgotPassword)

export default router;
