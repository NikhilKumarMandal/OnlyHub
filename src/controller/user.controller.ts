import { genarateAccessTokenAndRefreshToken } from '../utils/genrateAccessTokenAndRefreshToken.js';
import { Logger } from "winston";
import { UserService } from "../services/user.servies.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Request,Response } from "express";
import { CookieOptions } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';


export class UserController{

    constructor(
    private userService: UserService,
    private logger: Logger
    ){}

    create = asyncHandler(async (req: Request, res: Response) => {
        
        const { username, email, password } = req.body;

        const user = await this.userService.create({
            username,
            email,
            password
        })

        this.logger.info(`User is created successfully!`,{id: user._id})

        res.status(200).json(
            new ApiResponse(
                200,
                user,
                "User register successfully"
            ))
    })

    login = asyncHandler(async (req, res) => {
        
        const { email, password } = req.body;

        if (!email) {
            throw new ApiError(409,"Email is requried")
        };

        const user = await this.userService.findEmail(email);
        if (!user) {
            throw new ApiError(409,"User does not found!")
        };

        const isPasswordMatch = await this.userService.comparePassword(password, user.password);
        if (!isPasswordMatch) {
            throw new ApiError(409,"Emai or Password does not match!")
        }

        const { accessToken, refreshToken } = await genarateAccessTokenAndRefreshToken(user._id as string);

        const loggedInUser = await this.userService.findById(user._id as string);
        if (!loggedInUser) {
        throw new ApiError(409,"Failed to retrieve user data!")
        }

        this.logger.info("User Login successfully")

        const accessCookie: CookieOptions = {
        domain: "localhost",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60, // 1 hour
        httpOnly: true,
        };

        const refreshCookie: CookieOptions = {
        domain: "localhost",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 10, // 10 days
        httpOnly: true,
        };

        res
            .status(200)
            .cookie("accessToken", accessToken, accessCookie)
            .cookie("refreshToken", refreshToken, refreshCookie)
            .json(
                new ApiResponse(
                    200,
                    loggedInUser,
                    "User LoggedIn successfully"
                ))
        

    })

    genrateRefreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401,"Unauthorized request");
    }

    try {

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECERT as string);

        const userId = (decodedToken as JwtPayload).id;
        
        if (!userId) {
            throw new ApiError(409,"Invalid token payload");
        }

        const user = await this.userService.findById(userId as string);
        if (!user) {
            throw new ApiError(409,"User does not exist!");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(409,"Refresh token is expired or invalid");
        }

        const { accessToken, refreshToken: newRefreshToken } = await genarateAccessTokenAndRefreshToken(user._id as string);
        
        const accessCookie: CookieOptions = {
            domain: "localhost",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60, // 1 hour
            httpOnly: true,
        };

        const refreshCookie: CookieOptions = {
            domain: "localhost",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 10, // 10 days
            httpOnly: true,
        };

        res
            .status(200)
            .cookie("accessToken", accessToken, accessCookie)
            .cookie("refreshToken", newRefreshToken, refreshCookie)
            .json(
                new ApiResponse(
                    201,
                    { accessToken, refreshToken: newRefreshToken }, "Access token refreshed"
                ));
        
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating the refresh token!");
    }
    });
    
    
    logout = asyncHandler(async (req, res) => {
        await this.userService.findByIdAndUpdated(req.user?._id as string, 1)
        
        const accessCookie: CookieOptions = {
            domain: "localhost",
            sameSite: "strict",
            httpOnly: true,
        };

        const refreshCookie: CookieOptions = {
            domain: "localhost",
            sameSite: "strict",
            httpOnly: true,
        };

        this.logger.info("User logout successfully!!")

        res
            .status(200)
            .clearCookie("accessToken", accessCookie)
            .clearCookie("refreshToken", refreshCookie)
            .json(new ApiResponse(200,{},"User logout successfully"))
    })

    getUserChannelProfile = asyncHandler(async (req, res) => {
        const { username } = req.params

        if (!username?.trim()) {
        throw new ApiError(400, "username is missing")
        }

        const channel = await this.userService.getUserData(username,req.user?._id as string);

        if (!channel.length) {
            throw new ApiError(404,"Channel not found")
        }

        res.status(200).json(
            new ApiResponse(
                200,
                channel[0],
                "Channel profile fected successfully"
            ))
    })

    getWatchHistory = asyncHandler(async (req, res) => {
        
        const user = await this.userService.getWatchHistory(req.user?._id as string);

        if (!user) {
            throw new ApiError(404,"User not found")
        }

        res.status(200).json(
            new ApiResponse(
                200,
                user[0]?.watchHistory,
                "Watch histiry fected successfully"
            ))
    })


}