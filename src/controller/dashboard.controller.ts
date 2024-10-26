import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { DashboardService } from "../services/dashboard.services.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export class DashboardController {

    constructor(
        private dashboardService: DashboardService
    ){}

    getChannelStats = asyncHandler(async (req, res) => {
        const userId = req.user?._id as string;

        if (!isValidObjectId(userId)) {
            throw new ApiError(400,"This is not valid userId:")
        }

        const videoData = await this.dashboardService.videoStats(userId);
        const subData = await this.dashboardService.subscribers(userId);
        const likeData = await this.dashboardService.like(userId);
        
        const data = {
        video: videoData[0] || { totalView: 0, totalVideo: 0, status: false },
        sub: subData[0] || { subscriberCount: 0 },
        like: likeData[0] || { LikedVideo: 0 },
        };

        res.status(200).json(new ApiResponse(
            200,
            data,
            "Fected successfully"
        ))

    })
}