import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export class HealthcheckController{
    healthcheck = asyncHandler(async (req, res) => {
        res.status(200).json(new ApiResponse(
            200,
            {},
            "Ok"
        ));
    })
}