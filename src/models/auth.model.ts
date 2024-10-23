import mongoose, { Document,Schema } from "mongoose";
import jwt from "jsonwebtoken"
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    refreshToken: string
    generateAccessToken: () => Promise<string>; 
    generateRefreshToken: () => Promise<string>;
}

const userSchema = new Schema({
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
        required: [true,"Password is requried!"]
    },
    avatar: {
        type: String
    },coverImage: {
        type: String, // cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    refreshToken: {
        type: String
    }
    },
    {
    timestamps: true   
    }
)

userSchema.methods.generateAccessToken = async function (): Promise<string> {
    return jwt.sign({
        id: this._id
    }, process.env.ACCESS_TOKEN_SECERT!,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });
};

userSchema.methods.generateRefreshToken = async function (): Promise<string> {
    return jwt.sign({
        id: this._id
    }, process.env.REFRESH_TOKEN_SECERT!,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });
};

export const User = mongoose.model<IUser>("User", userSchema);