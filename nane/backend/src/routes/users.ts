import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const prisma = new PrismaClient()
const router = express.Router()

router.use(authMiddleware)

router.get('/me', async (req: AuthRequest, res) => {
  const userId = (req.user as any).userId
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { wallet: true }
  })
  res.json(user)
})

router.put('/me', async (req: AuthRequest, res) => {
  const userId = (req.user as any).userId
  const { name, email } = req.body
  const user = await prisma.user.update({
    where: { id: userId },
    data: { name, email }
  })
  res.json(user)
})

export default router