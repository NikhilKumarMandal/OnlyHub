import { IUser } from "../models/auth.model.ts"; 

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}