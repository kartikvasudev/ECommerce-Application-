import express from "express";
const router = express.Router();
import { loginController, registerController,userController } from "../controllers/index.js";
import auth from "../middleware/auth.js";

router.post('/register',registerController.register);
router.post('/login',loginController.login);
router.get('/me',auth,userController.me)

export default router;