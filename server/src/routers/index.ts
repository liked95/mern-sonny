import { Router } from "express";
import authRouter from "./authRouter.ts";

const appRouter = Router();

appRouter.use("/auth", authRouter)

export default appRouter;
