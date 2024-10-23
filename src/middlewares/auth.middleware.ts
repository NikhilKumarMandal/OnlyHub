import { asyncHandler } from "../utils/asyncHandler.js";
import jwt, { JwtPayload } from "jsonwebtoken"
import { UserService } from "../services/user.servies.js";


const userService = new UserService()

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
        if (!token) {
            throw new Error("Token does not found!")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT!);
    
        const userId = (decodedToken as JwtPayload).id;
            
        if (!userId) {
                throw new Error("Invalid token payload");
        }
    
        const user = await userService.findById(userId as string);
        if (!user) {
            throw new Error("User does not exist!");
        }
    
        req.user = user
        next();
    } catch (error) {
        throw new Error("Invalid access token")
    }
}) 