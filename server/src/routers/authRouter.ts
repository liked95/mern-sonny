import { Router } from "express";
import authController from "../controllers/authController.ts";

const authRouter = Router();

authRouter.post("/create", authController.createAccount);
authRouter.post("/login", authController.login);

export default authRouter;
