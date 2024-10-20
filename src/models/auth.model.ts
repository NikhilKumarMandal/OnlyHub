import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        maxlength: [20, "Username cannot exceed 15 characters"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
    },
    {
    timestamps: true   
    }
)

export const User = mongoose.model<IUser>("User", userSchema);