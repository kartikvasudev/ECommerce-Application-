import express from "express";
const router = express.Router();
import { loginController, refreshController, registerController,userController } from "../controllers/index.js";
import auth from "../middleware/auth.js";

router.post('/register',registerController.register);
router.post('/login',loginController.login);
router.get('/me',auth,userController.me)
router.post('/refresh',refreshController.refresh)
router.post('/logout',auth,loginController.logout)

export default router;