import { Router } from "express";
import authController from "../controllers/authController.ts";

const appRouter = Router();

appRouter.post("/auth/create", authController.createAccount);
appRouter.post("/auth/login", authController.login);

export default appRouter;
