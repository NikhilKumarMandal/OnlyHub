import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/auth.model.js";
import { ISubscription } from "../types/type.js";



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
}