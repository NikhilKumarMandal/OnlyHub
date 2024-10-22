import { UserData } from "../types/type.js";
import { User, IUser } from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export class UserService {

    async create({ username, email, password }: UserData): Promise<IUser> {
            const existingUser = await User.findOne({
                $or: [{ email }, { username }],
            });
    
            if (existingUser) {
                throw new ApiError(409,"User with email or username already exists")
            }
    
            const saltRound = 10;
            const hashedPassword = await bcrypt.hash(password, saltRound);

            const user = new User({
                username,
                email,
                password: hashedPassword,
            });
    
            const savedUser = await user.save();
            
            const createdUser = await User.findById(savedUser._id).select("-password")
    
            if (!createdUser) {
                throw new ApiError(500,"Failed to create user.");
            }
    
            return createdUser;

    }

    async findById(userId: string): Promise<IUser | null> {
        return User.findById(userId).select("-password").exec();
    }

    async findEmail(email: string): Promise<IUser | null>{
        return User.findOne({ email });
    }

    async comparePassword(password: string, hashedPassword: string) {
        return await bcrypt.compare(password,hashedPassword)
    }

    async findByIdAndUpdated(userId:string,number: number) {
        return (await User.findByIdAndUpdate(
            { _id: userId },
            {
                $unset: {
                    refreshToken: number
                }
            },
            {
                new : true    
            }
        ))
    }

    async getUserData(username: string,userId: string) {
  
        return await User.aggregate([
            {
                $match: {
                    username: username?.toLowerCase()
                }
            },
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "channel",
                    as: "subscribers"
                }
            },
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "subscriber",
                    as: "subscribedTo"
                }
            },
            {
                $addFields: {
                    subscribersCount: {
                        $size: "$subscribers"
                    },
                    channelsSubscribedToCount: {
                        $size: "$subscribedTo"
                    },
                    isSubscribed: {
                        $cond: {
                            if: { $in: [userId, "$subscribers.subscriber"] },
                            then: true,
                            else: false
                        }
                    }
                }
            },
            {
                $project: {
                    username: 1,
                    avatar: 1,
                    coverImage: 1,
                    subscribersCount: 1,
                    channelsSubscribedToCount: 1,
                    isSubscribed: 1,
                }
            }
        ])
    }
}
