import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { VideoService } from "../services/video.servies.js";
import { VideoController } from "../controller/video.controller.js";
import logger from "../utils/logger.js";


const router = Router();

const videoService = new VideoService();
const videoController = new VideoController(videoService,logger)

router.post(
    "/video-upload",
    verifyJWT,
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1,
        },
        {
            name: "thumbnail",
            maxCount: 1,
        },      
    ]),
    videoController.pulishAVideo
)

router.patch(
    "/video-update/:id",
    verifyJWT,
    upload.fields([
        {
            name: "thumbnail",
            maxCount: 1,
        },      
    ]),
    videoController.updateVideo
)

router.delete(
    "/video-delete/:id",
    verifyJWT,
    videoController.deleteVideo
)

router.get(
    "/all-video",
    videoController.index
)

router.get(
    "/:id",
    verifyJWT,
    videoController.getVideoById
)

router.post(
    "/:id",
    verifyJWT,
    videoController.togglePublishStatus
)




export default router;