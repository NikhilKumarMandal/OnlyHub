import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { LikeService } from "../services/like.services.js";
import { LikeController } from "../controller/like.controller.js";
import logger from "../utils/logger.js";

const router = Router();
router.use(verifyJWT);

const likeService = new LikeService();
const likeController = new LikeController(likeService,logger)


router.post("/video-like/:id", likeController.toggleVideoLike)

export default router;