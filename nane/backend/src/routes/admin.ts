import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '../middleware/auth'
import { requireAdmin } from '../middleware/admin'

const prisma = new PrismaClient()
const router = express.Router()

// Protect all admin routes with auth + admin check
router.use(authMiddleware, requireAdmin)

/**
 * GET /api/admin/users
 * query:
 *  - page (default 1)
 *  - limit (default 10, max 100)
 *  - search (optional)
 */
router.get('/users', async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1)
  const limit = Math.min(Number(req.query.limit) || 10, 100)
  const search = String(req.query.search || '').trim()

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { mobile: { contains: search } },
          { email: { contains: search, mode: 'insensitive' } }
        ]
      }
    : {}

  const total = await prisma.user.count({ where })
  const users = await prisma.user.findMany({
    where,
    include: { wallet: true },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit
  })

  res.json({ users, total, page, limit })
})

router.post('/users/:id/block', async (req, res) => {
  const id = Number(req.params.id)
  await prisma.user.update({ where: { id }, data: { isActive: false } })
  res.json({ ok: true })
})

router.post('/users/:id/unblock', async (req, res) => {
  const id = Number(req.params.id)
  await prisma.user.update({ where: { id }, data: { isActive: true } })
  res.json({ ok: true })
})

router.get('/funds/summary', async (req, res) => {
  const deposits = await prisma.deposit.findMany()
  const withdrawals = await prisma.withdrawal.findMany()
  const totalDeposited = deposits.reduce((s, d) => s + d.amount, 0)
  const totalWithdrawn = withdrawals.reduce((s, d) => s + d.amount, 0)
  res.json({ totalDeposited, totalWithdrawn, deposits: deposits.length, withdrawals: withdrawals.length })
})

export default router