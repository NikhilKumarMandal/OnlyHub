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