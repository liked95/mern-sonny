import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import session from "express-session";
// import RedisStore from "connect-redis";
// import { Redis } from "ioredis";

import connectMongoDB from "./config/db.ts";
import appRouter from "./routers/index.ts";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.ts";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function init() {
  const app = express();

  await connectMongoDB();

  app.use(
    cors({
      origin: ["http://localhost:8000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

  app.use(morgan("dev"))
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.EXPRESS_SESSION_SECRET as string,
      resave: false,
      saveUninitialized: true,
    })
  );

  // Protected routes
  app.use("/api", appRouter);

  // Error handler middleware
  app.use(errorHandlerMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
}

init();
