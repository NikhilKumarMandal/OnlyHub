import mongoose, { Schema, Document } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface IVideo extends Document {
    videoFile: string; 
    thumbnail: string; 
    title: string; 
    description: string; 
    duration: number;
    views: number; 
    isPublished: boolean; 
    owner?: mongoose.Types.ObjectId; 
}

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // S3 bucket AWS
            required: true
        },
        thumbnail: {
            type: String, // Cloudinary URL
            required: true
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
            required: true
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

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model<IVideo>("Video", videoSchema);
