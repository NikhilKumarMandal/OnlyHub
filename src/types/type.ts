import { Request } from "express";

export interface UserData {
    username: string;
    email: string;
    password: string;
}

export interface RegisterUserRequest extends Request {
  body: UserData;
}