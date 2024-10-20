import { UserData } from "../types/type.js";
import { User, IUser } from "../models/auth.model.js";
import bcrypt from "bcryptjs";

export class UserService {
    async create({ username, email, password }: UserData): Promise<IUser> {
       
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            throw new Error("User already exists with this email or username.");
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
            throw new Error("Failed to create user.");
        }

        return createdUser;
    }
}
