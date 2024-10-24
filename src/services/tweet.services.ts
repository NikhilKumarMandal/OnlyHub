import { Tweet } from "../models/tweet.model.js";
import { ITweet } from "../types/type.js";
import { isValidObjectId } from "mongoose"
import { ApiError } from "../utils/ApiError.js";


export class TweetService{
    async create(tweet: ITweet) {
    const newTweet = new Tweet(tweet);
    return await newTweet.save();
    }   


    async userTweet(userId: string) {
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, `This is not a valid id: ${userId}`);
    }
        return await Tweet.find({ owner: userId });
    }

}