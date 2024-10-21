import { UserService } from '../services/user.servies.js';
import { UserController } from './../controller/user.controller.js';
import { Router } from "express";
import logger from '../utils/logger.js';

const router = Router();

const userService = new UserService() 
const userController = new UserController(userService,logger)

router.post("/register", userController.create);
router.post("/login", userController.login.bind(userController));


export default router;