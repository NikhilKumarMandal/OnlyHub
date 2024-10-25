
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { SubscriptionController } from "../controller/subscription.controller.js";
import { SubscriptionService } from "../services/subscription.services.js";
import logger from "../utils/logger.js";
import { UserService } from "../services/user.services.js";

const router = Router()
router.use(verifyJWT);

const subService = new SubscriptionService()
const userSerive = new UserService()
const subController = new SubscriptionController(userSerive,subService,logger)

router.post("/subscribe/:id",subController.toggleSubscription)

export default router