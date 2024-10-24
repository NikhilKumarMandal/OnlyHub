import  { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { TweetController } from "../controller/tweet.controller.js";
import { TweetService } from "../services/tweet.services.js";
import logger from "../utils/logger.js";

const router = Router()
router.use(verifyJWT)

const tweetService = new TweetService()
const tweetController = new TweetController(tweetService,logger)

router.post("/create-tweet",tweetController.createTweet)
router.get("/user-tweet",tweetController.getUserTweets)
router.get("/update-tweet/:id",tweetController.updateTweet)
router.delete("/delete-tweet/:id",tweetController.deleteTweet)

export default router