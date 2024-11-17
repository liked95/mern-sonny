import { JwtPayload } from "jsonwebtoken";
import {Request} from 'express'

export type TUser = {
  _id: string;
  username: string;
};

export interface AuthRequest extends Request {
  user?: JwtPayload | string
}
