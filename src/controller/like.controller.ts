import { isValidObjectId } from "mongoose";
import { SubscriptionService } from "../services/subscription.services.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { LikeService } from "../services/like.services.js";
import { Logger } from "winston";



export class LikeController{

    constructor(
        private likeService: LikeService,
        private logger: Logger
    ) { }
    
    toggleVideoLike = asyncHandler(async(req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "This is not a valid video id");
    }

    const userId = req.user?._id as string;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "This is not a valid user id");
    }

    const isAlreadyLiked = await this.likeService.toggleVideo(id, userId);

    if (isAlreadyLiked) {
        const removeLike = await this.likeService.findAndDeletedVideo(id, userId);

        res.status(200).json(new ApiResponse(
            200,
            removeLike,
            "Unliked successfully"
        ));
        return;
    }

    const like = await this.likeService.createVideo(id, userId);
        
        res.status(200).json(new ApiResponse(
            200,
            like,
            "Liked successfully!"
        ));
    });

    toggleCommentLike = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400,"This is not a valid comment id:")
    }

    const userId = req.user?._id as string;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "This is not a valid user id");
    }

    const isAlreadyLiked = await this.likeService.toggleComment(id, userId);

    if (isAlreadyLiked) {
        const removeLike = await this.likeService.findAndDeletedComment(id, userId);

        res.status(200).json(new ApiResponse(
            200,
            removeLike,
            "Unliked comment successfully"
        ));
        return;
    }

    const like = await this.likeService.createComment(id, userId);
        
        res.status(200).json(new ApiResponse(
            200,
            like,
            "Liked comment successfully!"
        ));
    })

    toggleTweetLike = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400,"This is not a valid comment id:")
    }

    const userId = req.user?._id as string;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "This is not a valid user id");
    }

    const isAlreadyLiked = await this.likeService.toggleTweet(id, userId);

    if (isAlreadyLiked) {
        const removeLike = await this.likeService.findAndDeletedTweet(id, userId);

        res.status(200).json(new ApiResponse(
            200,
            removeLike,
            "Unliked tweet successfully"
        ));
        return;
    }

    const like = await this.likeService.createTweet(id, userId);
        
        res.status(200).json(new ApiResponse(
            200,
            like,
            "Liked tweet successfully!"
        ));
    })

}