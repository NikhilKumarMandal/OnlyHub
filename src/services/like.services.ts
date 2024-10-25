import { Like } from "../models/like.model.js"


export class LikeService{
    async toggleVideo(videoId: string,userId:string) {
        return await Like.findOne({
            video: videoId,
            likedBy: userId
        })
    }

    async createVideo(videoId: string,userId:string) {
        const like = await Like.create({
            video: videoId,
            likedBy: userId
        })
        return await like.save()
    }

    async findAndDeletedVideo(videoId: string, userId: string) { 
        return await Like.findOneAndDelete({
            video: videoId,
            likedBy: userId
        })
    }

    async toggleComment(commentId: string,userId:string) {
        return await Like.findOne({
            comment: commentId,
            likedBy: userId
        })
    }

    async createComment(commentId: string,userId:string) {
        const like = await Like.create({
            comment: commentId,
            likedBy: userId
        })
        return await like.save()
    }

    async findAndDeletedComment(commentId: string, userId: string) { 
        return await Like.findOneAndDelete({
            comment: commentId,
            likedBy: userId
        })
    }

    async toggleTweet(tweetId: string,userId:string) {
        return await Like.findOne({
            tweet: tweetId,
            likedBy: userId
        })
    }

    async createTweet(tweetId: string,userId:string) {
        const like = await Like.create({
            tweet: tweetId,
            likedBy: userId
        })
        return await like.save()
    }

    async findAndDeletedTweet(tweetId: string, userId: string) { 
        return await Like.findOneAndDelete({
            tweet: tweetId,
            likedBy: userId
        })
    }
}