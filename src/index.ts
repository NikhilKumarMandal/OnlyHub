import express, { Application,Request,Response } from "express"
import "dotenv/config"
import logger from "./utils/logger.js";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms";

const app: Application = express()
const PORT = process.env.PORT || 5050

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.listen(PORT, () => {
    logger.info(`Server is running...${PORT}`);
    
})

app.get("/", (req: Request, res: Response) => {
    res.json({msg:"Hello world..."})
})