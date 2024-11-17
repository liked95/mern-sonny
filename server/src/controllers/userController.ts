import { Response } from 'express'
import { AuthRequest } from '../types/user.ts'

const getUser = (req: AuthRequest, res: Response) => {
  res.json({ success: 1, data: req.user })
}

export default { getUser }
