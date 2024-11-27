import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import session from 'express-session'
import path, { dirname } from 'path'
// import RedisStore from "connect-redis";
// import { Redis } from "ioredis";

import connectMongoDB from './config/db.ts'
import appRouter from './routers/index.ts'
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.ts'
import { fileURLToPath } from 'url'

dotenv.config()

const PORT = process.env.PORT || 5000

async function init() {
  const app = express()

  await connectMongoDB()

  const corsOptions =
    process.env.NODE_ENV === 'development'
      ? {
          origin: 'http://localhost:8000',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
        }
      : {}

  app.use(cors(corsOptions))

  // Serve static files from the client build folder
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const publicPath =
    process.env.NODE_ENV === 'development' ? path.join(__dirname, '../public') : path.join(__dirname, '../../public')
  app.use(express.static(publicPath))

  console.log('first', path.join(publicPath, 'index.html'))

  app.use(morgan('dev'))
  app.use(express.json())
  app.use(cookieParser())
  app.use(
    session({
      secret: process.env.EXPRESS_SESSION_SECRET as string,
      resave: false,
      saveUninitialized: true,
    })
  )

  // Protected routes
  app.use('/api', appRouter)
  app.use('/*', (req, res, next) => {
    res.sendFile(path.join(publicPath, 'index.html'))
  })

  // Error handler middleware
  app.use(errorHandlerMiddleware)

  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
  })
}

init()
