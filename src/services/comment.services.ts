import { Comment } from "../models/comment.model.js";
import { IComment } from "../types/type.js";
import { ApiError } from "../utils/ApiError.js";



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
}