import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { UserService } from "../services/user.services.js";
import { Logger } from "winston";
import { SubscriptionService } from "../services/subscription.services.js";
import { ApiResponse } from "../utils/ApiResponse.js";




export class SubscriptionController{

    constructor(
        private userService: UserService,
        private subService: SubscriptionService,
        private logger: Logger
    ){}

    toggleSubscription = asyncHandler(async (req, res) => {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            throw new ApiError(400,"This is not valid a id:")
        }

        const channel = this.userService.findById(id);
        if (!channel) {
            throw new ApiError(400,"Channel not found!")
        }

   
        const userId = req.user?._id as string
        const isAlreadySubscribed = await this.subService.toggle(id, userId);

        if (isAlreadySubscribed) {
            await this.subService.findAndDeleted(id, userId)
            res.status(200).json(new ApiResponse(
                200,
                {
                    isSubscribed: false
                },
                "UnSubscribed successfull"
            ))
        } 
            
        await this.subService.create(id, userId);
            res.status(200).json(new ApiResponse(
                200,
                {
                    isSubscribed: true
                },
                "Subscribed successfull"
        ))
    })

    getUserChannelSubscribers = asyncHandler(async (req, res) => {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            throw new ApiError(400,"This is not a valid id:")
        }

        const channelInfo = await this.subService.channelToSub(id)

        if (!channelInfo.length) {
            throw new ApiError(404,"Channel does not found")
        }

        res.status(200).json(new ApiResponse(200,channelInfo,"Channel info fected successfulyy"))
    })
}