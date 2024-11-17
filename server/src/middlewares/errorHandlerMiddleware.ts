import { Request, Response, NextFunction } from 'express'

function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  const isDevelopment = process.env.NODE_ENV === 'development'
  isDevelopment && console.error(err.stack)
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'
  res.status(status).json({
    success: 0,
    error: {
      message,
      ...(isDevelopment && { stack: err.stack }),
    },
  })
}

export default errorHandlerMiddleware
