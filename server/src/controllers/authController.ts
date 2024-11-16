import { Request, Response } from "express";
import User from "../models/User.ts";
import { hashPassword } from "../utility/password.ts";
import { comparePassword } from "../utility/password.ts";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utility/jwt-util.ts";

export const createAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    console.log("handle create");
    if (!req.body.username) {
      return res
        .status(400)
        .json({ success: 0, message: "Username is required" });
    }

    if (!req.body.password) {
      return res
        .status(400)
        .json({ success: 0, message: "Password is required" });
    }

    const isExist = await User.findOne({ username: req.body.username });
    if (isExist) {
      return res
        .status(401)
        .json({ success: 0, message: "Username already exists" });
    }

    const newUser = await User.create({
      username: req.body.username,
      password: hashPassword(req.body.password),
    });

    res.json({ success: 1, data: newUser });
  } catch (error) {
    console.log("error ", error);
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.body.username) {
      return res
        .status(400)
        .json({ success: 0, message: "Username is required" });
    }

    if (!req.body.password) {
      return res
        .status(400)
        .json({ success: 0, message: "Password is required" });
    }

    const user = await User.findOne({ username: req.body.username });
    console.log("User: ", user);
    // Invalidate
    if (!user || !comparePassword(req.body.password, user.password)) {
      return res
        .status(401)
        .json({ success: 0, message: "Invalid username or password" });
    }

    // Send tokens to client
    const accessToken = await generateAccessToken({
      _id: user._id.toString(),
      username: user.username,
    });

    // Send token to client
    const refreshToken = await generateRefreshToken({
      _id: user._id.toString(),
      username: user.username,
    });

    res.cookie("token", accessToken, {
      httpOnly: true, // Prevent access via JavaScript
      secure: false, // Set to true in production when using HTTPS
      sameSite: "lax", // Or "None" if cross-origin
      path: "/"
    });
    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.json({ success: 1, message: "Login successfuly" });
  } catch (error) {
    console.log("error ", error);
  }
};

export default { createAccount, login };
