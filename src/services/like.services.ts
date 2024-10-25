import { Like } from "../models/like.model.js"


export class LikeService{
    async toggle(videoId: string,userId:string) {
        return await Like.findOne({
            video: videoId,
            likedBy: userId
        })
    }

    async create(videoId: string,userId:string) {
        const like = await Like.create({
            video: videoId,
            likedBy: userId
        })
        return await like.save()
    }

    async findAndDeleted(videoId: string, userId: string) { 
        return await Like.findOneAndDelete({
            video: videoId,
            likedBy: userId
        })
    }
}