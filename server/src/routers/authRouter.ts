import { Router } from "express";
import { authController } from "../controllers/authController/create.ts";

const authRouter = Router();

authRouter.post("/create", authController);

export default authRouter;
