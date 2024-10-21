import { genarateAccessTokenAndRefreshToken } from '../utils/genrateAccessTokenAndRefreshToken.js';
import { Logger } from "winston";
import { UserService } from "../services/user.servies.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Request,Response } from "express";
import { CookieOptions } from "express"


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

        res.status(200).json({user})
    })

    login = asyncHandler(async (req, res) => {
        
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Email is requried")
        };

        const user = await this.userService.findEmail(email);
        if (!user) {
            throw new Error("User does not found!")
        };

        const isPasswordMatch = await this.userService.comparePassword(password, user.password);
        if (!isPasswordMatch) {
            throw new Error("Emai or Password does not match!")
        }

        const { accessToken, refreshToken } = await genarateAccessTokenAndRefreshToken(user._id as string);

        const loggedInUser = await this.userService.findById(user._id as string);
        if (!loggedInUser) {
        throw new Error("Failed to retrieve user data!")
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
            .json({
                msg: "User Login successfully",
                loggedInUser: {emai: loggedInUser.email}
        })
        

    })
}