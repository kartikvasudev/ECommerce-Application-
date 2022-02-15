import express from "express";
const router = express.Router();
import { loginController, registerController,userController } from "../controllers/index.js";

router.post('/register',registerController.register);
router.post('/login',loginController.login);
router.get('/me',userController.me)

export default router;