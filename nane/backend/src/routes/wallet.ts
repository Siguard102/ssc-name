import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const prisma = new PrismaClient()
const router = express.Router()

router.use(authMiddleware)

router.get('/', async (req: AuthRequest, res) => {
  const userId = (req.user as any).userId
  const wallet = await prisma.wallet.findUnique({ where: { userId } })
  res.json(wallet)
})

router.post('/deposit', async (req: AuthRequest, res) => {
  const userId = (req.user as any).userId
  const { amount, method } = req.body
  if (!amount || amount <= 0) return res.status(400).json({ error: 'invalid amount' })
  await prisma.deposit.create({ data: { userId, amount: Number(amount), status: 'confirmed' } })
  const w = await prisma.wallet.findUnique({ where: { userId } })
  if (w) {
    await prisma.wallet.update({
      where: { userId },
      data: {
        balance: w.balance + Number(amount),
        deposited: w.deposited + Number(amount)
      }
    })
  }
  res.json({ ok: true })
})

router.post('/withdraw', async (req: AuthRequest, res) => {
  const userId = (req.user as any).userId
  const { amount, method } = req.body
  if (!amount || amount <= 0) return res.status(400).json({ error: 'invalid amount' })
  const w = await prisma.wallet.findUnique({ where: { userId } })
  if (!w || w.balance < amount) return res.status(400).json({ error: 'insufficient funds' })
  await prisma.withdrawal.create({ data: { userId, amount: Number(amount), method, status: 'pending' } })
  // subtract from balance (reserved)
  await prisma.wallet.update({ where: { userId }, data: { balance: w.balance - Number(amount) } })
  res.json({ ok: true, message: 'Withdrawal request submitted' })
})

export default router