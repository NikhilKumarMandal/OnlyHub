// src/services/notification.service.ts

import { Notification } from "../models/notification.model.js";



export class NotificationService {
    async create(userId: string, videoId: string, message:string) {
    const notification = new Notification({
        userId,
        videoId,
        message
    });

    await notification.save();
    }
}
