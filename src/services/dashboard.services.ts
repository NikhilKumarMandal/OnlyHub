import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";



export class DashboardService{


    async videoStats(userId: string) {
        //Get the channel stats like total video views, total subscribers, total videos, total likes etc.

        return await Video.aggregate([
            {
                $match: {
                    owner: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $group: {
                    _id: "$owner",
                    totalView: {
                        $sum: "$view"
                    },
                    totalVideo: {
                        $sum:1
                    },
                    status: {
                        $max: "$isPublished"
                    }
                }
            },
        ])
    }

    async subscribers(userId: string) {
        return await Subscription.aggregate([
            {
                $match: {
                    channel: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $group: {
                    _id: "$channel",
                    subscriberCount: {
                        $sum: 1
                    }
                }    
            }
        ])
    }

    async like(userId: string) {
        return await Like.aggregate([
            {
                $match:{
                    likedBy : new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $group:{
                    _id: "$likedBy",
                    LikedVideo:{
                        $sum: 1
                    }
                }
            }
        ])
    }

    async totalVideo(userId: string) {
        
        return await Video.find({
            owner: userId
        })
    }
}



//[
//   {
// 		$match: {
// 			owner: ObjectId("6715349cb5816309f0c25aa7")
//     }
//   },
//   {
// 			$group: {
// 			  _id: "$owner",
//         viewCount: {
// 						$sum: "$view"
//         },
//         TotalVideo: {
// 					$sum: 1
//         },
//         status: {
// 						$max: "$isPublished"
//         }
// 			}
//   }
// ]