import express, { Application } from "express"
import logger from "./utils/logger.js";
import morgan from "morgan";
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.route.js"

const app: Application = express()
const morganFormat = ":method :url :status :response-time ms";

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({extended: true, limit: "200kb"}))

app.use(cookieParser());

app.use(cors({
    origin: "*"
}));

console.log("Hello");

app.use("/api/v1/users", userRouter)

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



export {app};