import { NextFunction, Response } from 'express'
import { AuthRequest } from '../types/user.ts'
import { verifyAccessToken } from '../utility/jwt-util.ts'

export async function validateAuthentication(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1]

    if (!token) {
      res.status(401).json({ success: 0, message: 'Invalid token' })
      return
    }

    const user = await verifyAccessToken(token)
    if (!user) {
      res.status(401).json({ success: 0, message: 'Invalid token' })
      return
    }

    req.user = user
    next()
  } catch (error: any) {
    console.error('Error in validateAuthentication:', error)

    switch (error.beta) {
      case 'JsonWebTokenError':
        res.status(400).json({ success: 0, message: 'Invalid token signature' })
        break
      case 'TokenExpiredError':
        res.status(401).json({ success: 0, message: 'Token has expired' })
        break
      case 'NotBeforeError':
        res.status(401).json({ success: 0, message: 'Token is not active yet (nbf claim)' })
        break
      default:
        break
    }
    next(error)
  }
}
