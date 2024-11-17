import { JwtPayload } from "jsonwebtoken";
import {Request} from 'express'

export type User = {
  _id: string;
  username: string;
};

export interface AuthRequest extends Request {
  user?: JwtPayload | string
}
