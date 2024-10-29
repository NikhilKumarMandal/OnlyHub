import express, { Application } from "express"
import logger from "./utils/logger.js";
import morgan from "morgan";
import http from 'http';
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import videoRouter from "./routes/video.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import commentRouter from "./routes/comment.routes.js"
import subRouter from "./routes/subscription.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import healthcheckRouter from "./routes/healthcheck.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"

const app: Application = express()
const morganFormat = ":method :url :status :response-time ms";








app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_ENDPOINT,
    credentials: true,
  })
);


app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/tweet",tweetRouter );
app.use("/api/v1/comment",commentRouter );
app.use("/api/v1/sub",subRouter );
app.use("/api/v1/like",likeRouter );
app.use("/api/v1/playlist",playlistRouter);
app.use("/api/v1/healthcheck",healthcheckRouter);
app.use("/api/v1/dashboard",dashboardRouter);


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