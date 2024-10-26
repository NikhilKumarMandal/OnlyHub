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

        const playlist = await this.playlistService.findPlaylist(id);

        if (!playlist) {
            throw new ApiError(404,"UserPlaylist does not found or user playlist does not exist")
        }

        res.status(200).json(new ApiResponse(
            200,
            playlist,
            "Fected Playlist!"
        ))
    })

    getPlaylistById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "This is not a valid id:");
    }

    const playlist = await this.playlistService.findById(id);
    
    console.log("Fetched playlist:", playlist);
    
    if (!playlist) {
        throw new ApiError(404, "UserPlaylist does not exist or was not found.");
    }

    res.status(200).json(
        new ApiResponse(
            200,
            playlist,
            "UserPlaylist fetched successfully"
        ));
    });


    addVideoToPlaylist = asyncHandler(async (req, res) => {
        const { playlistId, videoId } = req.params;

        if (!isValidObjectId(playlistId)) {
            throw new ApiError(400,"This is not a  valid playListedId:")
        }

        if (!isValidObjectId(videoId)) {
            throw new ApiError(400,"This is not a valid video id:")
        }

        const pushVideo = await this.playlistService.findByIdAndUpdate(playlistId, videoId)
        
        res.status(200).json(new ApiResponse(
            200,
            pushVideo,
            "Video is push in the palylist"
        ))
    })

    removeVideoFromPlaylist = asyncHandler(async (req, res) => {
        const { playlistId, videoId } = req.params;

        if (!isValidObjectId(playlistId)) {
            throw new ApiError(400,"This is not a  valid playListedId:")
        }

        console.log(playlistId);
        
        if (!isValidObjectId(videoId)) {
            throw new ApiError(400,"This is not a valid video id:")
        }

        const playlist = await this.playlistService.findByIdAndUpdatePlaylist(playlistId, videoId);
        console.log(playlist);
        
        
        if (!playlist) {
        throw new ApiError(401,"Something went wrong")
        }

        res.status(200).json(new ApiResponse(
            200,
            playlist,
            "Remove video from playlist successfully"
            ))
    })

    deletePlaylist = asyncHandler(async (req, res) => {
        const { playlistId } = req.params;
        if (!isValidObjectId(playlistId)) {
            throw new ApiError(400,"This is not a  valid playListedId:")
        }
        const userId = req.user?._id as string;

         if (!isValidObjectId(userId)) {
            throw new ApiError(400,"This is not a  valid userId:")
        }

        const deletedPlaylist = await this.playlistService.findByIdAndDelete(playlistId, userId);


        if (!deletedPlaylist) {
        throw new ApiError(404, "Playlist not found or user is not the owner.");
        }


        res.status(200).json(new ApiResponse(200,{},"Playlist deleted successfully"))
    })
}