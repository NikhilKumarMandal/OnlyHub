import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs";
import logger from "./logger.js";




cloudinary.config({ 
    cloud_name: 'dfnbvscob', 
    api_key: '332287963247526', 
    api_secret: 'bz4ES2JEgFlAPcmqPMg_03kbVlQ' 
});
  

const uploadOnCloudinary = async (localFilePath: string): Promise<UploadApiResponse | null> => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        
        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath);
        if (error instanceof Error) {
            logger.error(error.message)
        }
        return null;
    }
};

const deleteFromCloudinary = async (public_id: string, resource_type: "image" | "video"): Promise<UploadApiResponse | null> => {
    try {
        if (!public_id) {
            return null;
        }

        // Delete from Cloudinary
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const response = await cloudinary.uploader.destroy(public_id, {
            invalidate: true,
            resource_type
        });



        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return response;
    } catch (error) {
        if (error instanceof Error) {
            logger.error(error.message)
        }
        return null;
    }
};

export { 
    uploadOnCloudinary, 
    deleteFromCloudinary 
};

