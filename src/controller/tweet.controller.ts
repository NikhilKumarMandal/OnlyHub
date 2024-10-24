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
        throw new ApiError(400, "Content is required!");
    }

    const tweet = {
        content,
        owner: req.user?._id as string
    };

    const tweetDetails = await this.tweetService.create(tweet);

    this.logger.info("Tweet is created successfully!");

    res.status(201).json(
        new ApiResponse(
            201,
            tweetDetails,
            "Tweet created successfully"
        )
    );
    });


    getUserTweets = asyncHandler(async (req, res) => {
    console.log('User ID:', req.user?._id);
    const userTweet = await this.tweetService.userTweet(req.user?._id as string);
    res.status(200).json(new ApiResponse(200, userTweet, "Fetched user Tweets"));
    });
}