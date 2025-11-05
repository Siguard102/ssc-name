import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const prisma = new PrismaClient()
const router = express.Router()

router.get('/', authMiddleware, async (req, res) => {
  const tasks = await prisma.task.findMany()
  res.json(tasks)
})

router.post('/complete', authMiddleware, async (req: AuthRequest, res) => {
  const { taskId } = req.body
  const userId = (req.user as any).userId
  const task = await prisma.task.findUnique({ where: { id: taskId } })
  if (!task) return res.status(404).json({ error: 'Task not found' })
  // mark as complete and credit wallet
  await prisma.taskProgress.upsert({
    where: { id: 0 }, // dummy composite key not available; simpler approach below:
    create: { userId, taskId, completed: true, progress: 100 },
    update: { completed: true, progress: 100 }
  }).catch(async () => {
    // fallback: create new
    await prisma.taskProgress.create({ data: { userId, taskId, completed: true, progress: 100 } })
  })
  // credit
  const w = await prisma.wallet.findUnique({ where: { userId } })
  if (w) {
    await prisma.wallet.update({ where: { userId }, data: { balance: w.balance + task!.reward } })
  }
  res.json({ ok: true, reward: task!.reward })
})

export default router