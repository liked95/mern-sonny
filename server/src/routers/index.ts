import { Router } from 'express'
import authRouter from './authRouter.ts'
import { validateAuthentication } from '../middlewares/authMiddleware.ts'
import userRouter from './userRouter.ts'


const appRouter = Router()

appRouter.use('/auth', authRouter)
appRouter.use('/user', validateAuthentication, userRouter)
appRouter.get("/test", (req, res) => {
    res.json({success: 1, data: "Github Actions dinh vlll"})
})



export default appRouter
