import jwt from "jsonwebtoken";
import { User } from "../types/user.ts";

const ACCESS_TOKEN_EXPIRATION = "15m";
const REFRESH_TOKEN_EXPIRATION = "7d";

export async function generateAccessToken(user: User): Promise<string> {
  try {
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error("Invalid access token secret key!");
    }

    const accessToken = await jwt.sign(
      {
        _id: user._id,
        username: user.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );

    return accessToken;
  } catch (error) {
    console.log("error generating access token", error);
    return "";
  }
}

export function verifyAccessToken(token: string) {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("Invalid access token secret key!");
  }
  const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return payload;
}

export async function generateRefreshToken(user: User): Promise<string> {
  try {
    if (!process.env.REFRESH_TOKEN_SECRET) {
      throw new Error("Invalid refresh token secret key!");
    }

    const accessToken = await jwt.sign(
      {
        _id: user._id,
        username: user.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRATION }
    );

    return accessToken;
  } catch (error) {
    console.log("error generating refresh token", error);
    return "";
  }
}

export function verifyRefreshToken(token: string) {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error("Invalid refresh token secret key!");
  }
  const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  return payload;
}
