import { Logger } from "winston";
import { PlaylistService } from "../services/playlist.services.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";




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

        const userId = req.user?._id as string
        const playlistDetails = {
            name,
            description,
            owner: userId
        }
        
        const playlist = await this.playlistService.create(playlistDetails);

        this.logger.info("Playlist created successfully",{id: playlist._id})

        res.status(200).json(new ApiResponse(
            200,
            playlist,
            "Playlist created successfulyy"
        ))
    })

    getUserPlaylists = asyncHandler(async (req, res) => {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            throw new ApiError(400,"This is not a valid id:")
        }

        const playlist = await this.playlistService.findById(id);

        if (!playlist) {
            throw new ApiError(404,"UserPlaylist does not found or user playlist does not exist")
        }

        res.status(200).json(new ApiResponse(
            200,
            playlist,
            "Fected Playlist!"
        ))
    })
}