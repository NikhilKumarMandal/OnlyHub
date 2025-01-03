import { Request } from "express";


export interface UserData {
    username: string;
    email: string;
    password: string;
}

export interface RegisterUserRequest extends Request {
  body: UserData;
}

export interface VideoData {
    videoFile: string;  
    thumbnail: {
        public_id: string;  
        url: string;       
    };
    title: string;        
    description: string;  
    duration?: number;    
    owner?:string;
}

export interface UpdateVideoData{
    title: string,
    description: string,
    thumbnail: {
        public_id: string,
        url: string
    }
}

export interface PaginateQuery {
    page: number;
    limit: number;
}

export interface ITweet{
    content: string;
    owner: string
}

export interface IComment{
    content: string;
    video: string;
    owner: string;
}

export interface ISubscription{
    channel: string;
    subscriber: string
}

export interface IPlaylist{
    name: string;
    description: string;
    owner: string
}