import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

const uploadOnCloudinary = async (
  localFilePath: string
): Promise<UploadApiResponse | null> => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); 
    console.error("Upload failed:", (error as Error)?.message);
    return null;
  }
};

const deleteFromCloudinary = async (
  public_id: string,
  resource_type: "image" | "video"
): Promise<UploadApiResponse | null> => {
  try {
    if (!public_id) {
      console.error("Missing publicId");
      return null;
    }

    const response = await cloudinary.uploader.destroy(public_id, {
      invalidate: true,
      resource_type: resource_type,
    });

    console.log(response);
    console.log("File deleted successfully");

    return response;
  } catch (error) {
    console.error("Delete failed:", (error as Error)?.message);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
