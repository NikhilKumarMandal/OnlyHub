import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { CommentController } from "../controller/comment.controller.js";
import { CommentService } from "../services/comment.services.js";
import logger from "../utils/logger.js";


const router = Router();
router.use(verifyJWT)

const commentService = new CommentService
const commentController = new CommentController(commentService,logger)

router.post("/add-comment/:id",commentController.addComment)
router.patch("/update-comment/:id",commentController.updateComment)
router.delete("/delete-comment/:id",commentController.deleteComment)


export default router