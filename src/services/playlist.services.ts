import { Playlist } from "../models/playlist.model.js";
import { IPlaylist } from "../types/type.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export class PlaylistService{

    async create(playlistDetails: IPlaylist) {
        const playlist = await new Playlist(playlistDetails);
        return await playlist.save();
    }

    async findPlaylist(userId: string) {
        return await Playlist.find({
            owner: userId
        })
    }

    async findById(playlistId: string) {
        return await Playlist.findById(playlistId)
    }
}