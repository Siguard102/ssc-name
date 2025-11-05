import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user?: any
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ error: 'Missing auth' })
  const token = header.replace('Bearer ', '')
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'change_me') as any
    // payload should include userId, mobile, role
    req.user = payload
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}