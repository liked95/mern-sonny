import { Request, Response } from "express";
import User from "../../models/User.ts";

export const authController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    console.log("handle create");
    if (!req.body.username) {
      return res.status(400).json({ error: "Username is required" });
    }

    if (!req.body.password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    res.json({ success: 1, data: newUser });
  } catch (error) {
    console.log("error ", error);
  }
};
