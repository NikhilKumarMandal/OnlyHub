import { Tweet } from "../models/tweet.model.js";
import { ITweet } from "../types/type.js";



export class TweetService{
    async create(tweet: ITweet) {
        return await new Tweet(tweet)
    }
}