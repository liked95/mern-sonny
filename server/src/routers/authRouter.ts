import { Router } from "express";
import { createAccount } from "../controllers/authController.ts";

const authRouter = Router();

authRouter.post("/create", createAccount);

export default authRouter;
