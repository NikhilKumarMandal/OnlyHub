import { Logger } from "winston"
import { VideoService } from "../services/video.servies.js"
import { VideoData } from "../types/type.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


export class VideoController{

    constructor(
        private videoService: VideoService,
        private logger: Logger
    ) { }


    pulishAVideo = asyncHandler(async (req, res) => {
        const { title, description } = req.body;

        if (!title || !description) {
            throw new ApiError(400,"All fields are required!")
        }

        const files = req.files as { [fieldname: string]: Express.Multer.File[] }

        const videoFileLocalPath = files?.videoFile?.[0]?.path;
        if (!videoFileLocalPath) {
            throw new ApiError(400, "Video file is required");
        }

        const thumbnailLocalPath = files?.thumbnail?.[0]?.path; 
        if (!thumbnailLocalPath) {
              throw new ApiError(400, "Thumbnail image is required");
        }

        const videoFile = await uploadOnCloudinary(videoFileLocalPath)
        if (!videoFile) {
            throw new ApiError(400,"VideoFile is required!")
        }

        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
        if (!thumbnail) {
            throw new ApiError(400,"Thumbnail is required!")
        }

        const uploadedVideo = await this.videoService.create({
            title,
            description,
            videoFile: videoFile.secure_url,
            thumbnail: {
                public_id: thumbnail.public_id,
                url: thumbnail.url
            },
            owner: req.user?._id,
            duration: videoFile.duration
        } as VideoData)

        this.logger.info("Video uploaded successfully",{_id: uploadedVideo._id})
        
        res.status(200).json(new ApiResponse(200, uploadedVideo, "Video is uploaded successfully"));
    })

    updateVideo = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "Video ID is required");
    }

    const { title, description } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const thumbnailLocalPath = files?.thumbnail?.[0]?.path;
    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail image is required");
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    if (!thumbnail) {
        throw new ApiError(400, "Thumbnail upload failed");
    }

    const videoDetails = {
        title,
        description,
        thumbnail: {
            public_id: thumbnail.public_id,
            url: thumbnail.url,
        },
    };


    const updatedVideo = await this.videoService.update(id, videoDetails); 

    if (!updatedVideo) {
        throw new ApiError(404, "Video not found or update failed");
    }

    this.logger.info("Video updated successfully", { _id: updatedVideo?.title });

    res.status(200).json(
        new ApiResponse(200, updatedVideo, "Video updated successfully")
    );
    });

}