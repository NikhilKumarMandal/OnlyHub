import { Logger } from "winston";
import { UserService } from "../services/user.servies.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Request,Response } from "express";



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
}