import { Logger } from "winston";
import { CommentService } from "../services/comment.services.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import  {isValidObjectId} from "mongoose"
import { ApiResponse } from "../utils/ApiResponse.js";

export class CommentController{

    constructor(
        private commentService: CommentService,
        private logger: Logger
    ) { }

    getVideoComments = asyncHandler(async (req, res) => {
        
    })

    addComment = asyncHandler(async (req, res) => {
        const { id } = req.params
        const userId = req.user?._id as string
        const { content } = req.body;

        if (!isValidObjectId(id)) {
            throw new ApiError(400,"This is not a valid videoId")
        }

        if (!isValidObjectId(userId)) {
            throw new ApiError(400,"This is not a valid userId")
        }

        if (!content) {
            throw new ApiError(400,"Content is requried!")
        }

        const commentData = {
            content,
            video: id,
            owner: userId
        }

        const comment = await this.commentService.create(commentData)

        this.logger.info("Comment created successfully")

        res.status(200).json(
            new ApiResponse(
                200,
                comment,
                "Comment add successfully"
            ))
    })

    updateComment = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const { content } = req.body;

        if (!isValidObjectId(id)) {
            throw new ApiError(400,"This is not a valid id:")
        }

        if (!content) {
            throw new ApiError(400,"Content is requried!")
        }
        
        const comment = await this.commentService.update(id, content)
        
        res.status(200).json(
            new ApiResponse(
                200,
                comment,
                "Comment updated successfully"
            ))
    })

    deleteComment = asyncHandler(async (req, res) => {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            throw new ApiError(400,"This is not a valid id:")
        }

        await this.commentService.delete(id);
        
        this.logger.info("Comment deleted successfully!");
        res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Comment deleted successfully!"
            ))
    })
}