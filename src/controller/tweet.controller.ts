import { Logger } from "winston";
import { TweetService } from "../services/tweet.services.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";



export class TweetController{

    constructor(
        private tweetService: TweetService,
        private logger: Logger
    ) { }

    createTweet = asyncHandler(async (req, res) => {
        const { content } = req.body;

        if (!content) {
            throw new ApiError(400,"Content is required!")
        }

        const tweet = {
            content,
            owner: req.user?._id as string
        }

        const tweetDetails = await this.tweetService.create(tweet);

        this.logger.info("Tweet is created successfully!")
        
        res.status(200).json(
            new ApiResponse(
                200,
                tweetDetails,
                "Tweet created successfulyy"
        ));

    })
}