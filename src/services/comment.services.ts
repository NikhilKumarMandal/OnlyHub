import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { IComment, PaginateQuery } from "../types/type.js";
import { ApiError } from "../utils/ApiError.js";
import { paginationLabels } from "../constant.js";



export class CommentService{

    async create(comment: IComment) {
        const userComment = await new Comment(comment);
        return userComment.save()
    }

    async update(commentId: string,content: string) {
        return await Comment.findByIdAndUpdate(
            commentId,
            {
                $set: {
                    content
                }
            },
            {
                new: true
            }
        )
    }

    async delete(commentId: string) {
        const comment = await Comment.findByIdAndDelete(commentId);
        if (!comment) {
            throw new ApiError(400,"Comment not found")
        }
        return comment;
    }

    async index(videoId:string,paginateQuery: PaginateQuery) {
        
        const aggregate = Comment.aggregate([
            {
                $match: {
                    video: new mongoose.Types.ObjectId(videoId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "owner",
                    pipeline: [
                        {
                            $project: {
                                username: 1,
                                avatar: 1
                            }
                        }
                    ]
                }
            },
            {
                $addFields: {
                    owner: {
                        $first: "$owner"
                    }
                }
            }
        ]);

    return await Comment.aggregatePaginate(aggregate,  {
        ...paginateQuery,
        customLabels: paginationLabels 
    })
    }
}