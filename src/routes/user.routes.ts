import { UserService } from '../services/user.services.js';
import { UserController } from './../controller/user.controller.js';
import { Router } from "express";
import logger from '../utils/logger.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

const userService = new UserService() 
const userController = new UserController(userService,logger)

router.post("/register", userController.create);
router.post("/login", userController.login);
router.post("/refresh-token", userController.genrateRefreshAccessToken);
router.post("/logout", verifyJWT,userController.logout);
router.post("/self",verifyJWT,userController.getCurrentUser);



export default router;