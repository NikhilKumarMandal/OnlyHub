import mongoose from "mongoose";
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

    async findByIdAndUpdate(playlistId: string, videoId: string) {
        return await Playlist.findByIdAndUpdate(
            playlistId,
            {
                $push: {
                    videos: videoId
                }
            },
            {
                new: true
            }
        )
    }

    async findByIdAndUpdatePlaylist(playlistId: string, videoId: string) {
    const objectIdVideoId = new mongoose.Types.ObjectId(videoId); 

    return await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull: {
                videos: objectIdVideoId
            }
        },  
        { new: true }
    );
    };

    async findByIdAndDelete(playlistId: string, userId: string) {
    return await Playlist.findOneAndDelete({
        _id: playlistId, // Change from playlistId to _id
        owner: userId
    });
    }


    async findByIdAndUpdatePlaylistDetails(playlistId: string,name: string,description:string) {
        return await Playlist.findByIdAndUpdate(
            playlistId,
            {
                $set: {
                    name,
                    description
                }
            },
            {
                new: true
            }
        )
    }

}