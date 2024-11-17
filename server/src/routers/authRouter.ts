import { Router } from "express";
import authController from "../controllers/authController.ts";

const authRouter = Router();

authRouter.post("/create", authController.createAccount);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);

export default authRouter;
