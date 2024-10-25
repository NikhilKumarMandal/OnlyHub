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
    ){}
    toggleVideoLike = asyncHandler(async(req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "This is not a valid video id");
    }

    const userId = req.user?._id as string;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "This is not a valid user id");
    }

    const isAlreadyLiked = await this.likeService.toggle(id, userId);

    if (isAlreadyLiked) {
        const removeLike = await this.likeService.findAndDeleted(id, userId);

        res.status(200).json(new ApiResponse(
            200,
            removeLike,
            "Unliked successfully"
        ));
        return;
    }

    const like = await this.likeService.create(id, userId);
        
    res.status(200).json(new ApiResponse(200, like, "Liked successfully!"));
    });

}