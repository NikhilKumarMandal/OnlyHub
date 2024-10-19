import connect_DB from "./db/index.js";
import { app } from "./app.js";
import logger from "./utils/logger.js";
import dotenv from "dotenv"

dotenv.config({
    path: './.env'
})


const PORT = process.env.PORT || 5050

connect_DB()
.then(() => {
  app.on("error", (error) => {
    logger.error("ERRR: ", error);
    throw error
  });

  app.listen(PORT, () => {
    logger.info(`⚙️  Server is running at port : ${process.env.PORT}`)
  });

})
.catch((err) => {
  logger.error("MONGO db connection failed !!! ", err)
})