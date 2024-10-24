import { Video } from "../models/video.model.js";
import { UpdateVideoData, VideoData } from "../types/type.js";
import { ApiError } from "../utils/ApiError.js";



export class VideoService{
    async create(videoData: VideoData) {
        const video = new Video(videoData)
        return await video.save()
    }

    async update(videoId: string,updateVideoDetails: UpdateVideoData) {
        const video = (await Video.findByIdAndUpdate(
            videoId ,
            {
                $set: {
                    ...updateVideoDetails
                }
            },
            {
                new: true
            }
        ))

        if (!video) {
            throw new ApiError(500,"Somthing went worng")
        }

        return video;
    }

    async delete(videoId: string) {
    const deletedVideo = await Video.findByIdAndDelete(videoId);
    
    if (!deletedVideo) {
        throw new ApiError(404, "Video not found");
    }

    return deletedVideo;
    }
}