import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import logger from "../utils/logger.js";

const connect_DB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${ process.env.MONGODB_URI }/${ DB_NAME }`)
        logger.info(`MongoDB connected successfully ${connectionInstance.connection.host}`)
    } catch (error) {
        logger.error("MongoDB failed to connected ", error)
        process.exit(1);
    }

}

export default connect_DB;