import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectMongoDB from "./config/db.ts";
import appRouter from "./routers/index.ts";
dotenv.config();

const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is undefined

async function init() {
  const app = express();

  await connectMongoDB();

  app.use(cors());
  app.use(express.json());

  app.use("/api", appRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
}

init();
