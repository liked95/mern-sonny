import { NextFunction, Request, Response } from 'express'
import User from '../models/User.ts'
import { hashPassword } from '../utility/password.ts'
import { comparePassword } from '../utility/password.ts'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utility/jwt-util.ts'
import { TUser } from '../types/user.ts'
import { generateAndSetTokens } from '../utility/generateAndSetTokens.ts'

export const createAccount = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log('handle create')
    if (!req.body.username) {
      return res.status(400).json({ success: 0, message: 'Username is required' })
    }

    if (!req.body.password) {
      return res.status(400).json({ success: 0, message: 'Password is required' })
    }

    const isExist = await User.findOne({ username: req.body.username })
    if (isExist) {
      return res.status(401).json({ success: 0, message: 'Username already exists' })
    }

    const newUser = await User.create({
      username: req.body.username,
      password: hashPassword(req.body.password),
    })

    res.json({ success: 1, data: newUser })
  } catch (error) {
    console.log('error ', error)
  }
}

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.body.username) {
      return res.status(400).json({ success: 0, message: 'Username is required' })
    }

    if (!req.body.password) {
      return res.status(400).json({ success: 0, message: 'Password is required' })
    }

    const user = await User.findOne({ username: req.body.username })

    // Invalidate
    if (!user || !comparePassword(req.body.password, user.password)) {
      return res.status(401).json({ success: 0, message: 'Invalid username or password' })
    }

    const userData = { _id: user._id.toString(), username: user.username }

    await generateAndSetTokens(userData, res)
  } catch (error) {
    console.log('error ', error)
  }
}

export const logout = async (req: Request, res: Response): Promise<any> => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    })

    res.clearCookie('refresh-token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    })

    res.status(200).json({ success: 1, message: 'Logout successful' })
  } catch (error) {
    console.log('error ', error)
    res.status(403).json({ success: 0, message: 'Forbidden' })
  }
}

export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies?.['refresh-token']
    if (!refreshToken) {
      res.status(401).json({ success: 0, message: 'Refresh token missing' })
    }

    const user = (await verifyRefreshToken(refreshToken)) as TUser
    if (!user) {
      res.status(403).json({ success: 0, message: 'Refresh token is invalid' })
    }

    const userData = { username: user.username, _id: user._id }
    await generateAndSetTokens(userData, res)
  } catch (error) {
    next(error)
  }
}

export default { createAccount, login, logout, refreshAccessToken }
