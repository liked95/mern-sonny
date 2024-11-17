import { TUser } from '../types/user.ts'
import { generateAccessToken, generateRefreshToken } from './jwt-util.ts'
import { Response } from 'express'

export const generateAndSetTokens = async (userData: TUser, res: Response) => {
  const accessToken = await generateAccessToken(userData)
  const refreshToken = await generateRefreshToken(userData)

  res.cookie('token', accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
  })
  res.cookie('refresh-token', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  })

  // Centralize response here
  return res.json({ success: 1, data: userData })
}
