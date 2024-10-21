import { UserService } from "../services/user.servies.js";


const userService = new UserService();

export const genarateAccessTokenAndRefreshToken = async (userId: string) => {

    try {
        const user = await userService.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return {accessToken,refreshToken}
    } catch (error) {
        throw new Error("Somthing went while genrating accessToken and refreshToken")
    }
}