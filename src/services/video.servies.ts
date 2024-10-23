import { Video } from "../models/video.model.js";
import { VideoData } from "../types/type.js";



export class VideoService{
    async create(videoData: VideoData) {
        const video = new Video(videoData)
        return await video.save()
    }
}