import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    subscriber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    },
    {
    timestamps: true
    }
);

export const Notification = mongoose.model("Notification", notificationSchema);
