import { Router } from 'express'
import authController from '../controllers/authController.ts'
import userController from '../controllers/userController.ts'

const userRouter = Router()

userRouter.get('/', userController.getUser)

userRouter.get('/test', (req, res) => {
  res.json({ success: 1, data: 'You so dumb' })
})


export default userRouter
