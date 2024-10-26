import { Logger } from "winston";
import { PlaylistService } from "../services/playlist.services.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";




export class PlaylistController{

    constructor(
        private playlistService: PlaylistService,
        private logger: Logger
    ){}

    createPlaylist = asyncHandler(async (req, res) => {
        const { name, description } = req.body;

    if (!name) {
        throw new ApiError(400,"name is required!")
    }

    if (!description) {
        throw new ApiError(400,"description is required!")
    }
        
        const playlistDetails = {
            name,
            description   
        }
        
        const playlist = await this.playlistService.create(playlistDetails);

        this.logger.info("Playlist created successfully",{id: playlist._id})

        res.status(200).json(new ApiResponse(
            200,
            playlist,
            "Playlist created successfulyy"
        ))
    })
}