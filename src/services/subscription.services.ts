import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/auth.model.js";
import { ISubscription } from "../types/type.js";
import mongoose from "mongoose";



export class SubscriptionService{

    async toggle(channelId: string,userId:string) {
        return await Subscription.findOne({
            channel: channelId,
            subscriber: userId
        })
    }

    async create(channelId: string,userId:string) {
        const sub = await Subscription.create({
            channel: channelId,
            subscriber: userId
        })
        return await sub.save()
    }

    async findAndDeleted(channelId: string, userId: string) {
        return await Subscription.findOneAndDelete({
            channel: channelId,
            subscriber: userId
        })
    }

    async channelToSub(channelId: string) {
        
        return Subscription.aggregate([
            {
                $match: {
                    channel: new mongoose.Types.ObjectId(channelId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "subscriber",
                    foreignField: "_id",
                    as: "subscriberInfo",
                    pipeline: [
                        {
                            $project: {
                                username: 1,
                                avatar:1
                            }
                        }
                    ]
                }
            },
            {
                $unwind: "$subscriberInfo"
            },
            {
                $project: {
                    subscriberInfo: 1
                }
            }
        ])
    }

    async userSubChannel(subId: string){
        return Subscription.aggregate([
            {
                $match: {
                    subscriber: new mongoose.Types.ObjectId(subId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "channel",
                    foreignField: "_id",
                    as: "subscribedChannels",
                    pipeline: [
                        {
                            $project: {
                                username: 1,
                                avatar: 1
                            }
                        }
                    ]
                } 
            },
            {
                $unwind: "$subscribedChannels"
            },
            {
                $project: {
                    subscribedChannels: 1
                }
            }
        ])
    }
}