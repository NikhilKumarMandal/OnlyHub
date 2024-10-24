import mongoose, { Schema, Document } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";



const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // S3 bucket AWS reference
            required: true
        },
        thumbnail: {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        duration: {
            type: Number,
            default: 0 
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false 
        }
    }, 
    {
        timestamps: true 
    }
);


videoSchema.plugin(aggregatePaginate);


export const Video = mongoose.model("Video", videoSchema);
