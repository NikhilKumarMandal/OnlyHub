import { paginationLabels } from "../constant.js";
import { Video } from "../models/video.model.js";
import { PaginateQuery, UpdateVideoData, VideoData } from "../types/type.js";
import { ApiError } from "../utils/ApiError.js";
import  mongoose, {isValidObjectId} from "mongoose"


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

    async getVideoById(videoId: string) {
        if (!isValidObjectId(videoId)) {
            throw new ApiError(400,"This is not a valid id:")
        }
        return await Video.findById(videoId)
    }

    async togglePublishStatus(videoId: string) {
        if (!isValidObjectId(videoId)) {
            throw new ApiError(400,"This is not a valid id:")
        }

        const video = await Video.findById(videoId);
        video.isPublished = !video.isPublished;
        return await video.save()
    }

    async index(
    q: string,
    paginateQuery: PaginateQuery,
    sortBy: string = 'createdAt', 
    sortType: string = 'desc', 
    userId?: string 
    ) {
    const searchQueryRegexp = new RegExp(q, "i");

    const aggregate = Video.aggregate([
        {
            $match: {
                $or: [
                    { title: searchQueryRegexp },
                    { description: searchQueryRegexp }
                ],
                ...(userId && { owner: new mongoose.Types.ObjectId(userId) }) 
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            avatar: 1,
                        }
                    }
                ]
            }
        },
        {
            $sort: {
                [sortBy]: sortType === 'desc' ? -1 : 1
            }
        },
        {
            $unwind: "$ownerDetails"
        }
    ]);

    return await Video.aggregatePaginate(aggregate, {
        ...paginateQuery,
        customLabels: paginationLabels 
    });
}

}