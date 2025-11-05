import express from 'express'
import { PrismaClient } from '@prisma/client'
import twilio from 'twilio'
import bcrypt from 'bcrypt'
import { signToken } from '../utils/jwt'

const prisma = new PrismaClient()
const router = express.Router()

// NOTE: This is a simplified OTP flow for demo. In production use Twilio Verify service.
router.post('/send-otp', async (req, res) => {
  const { mobile } = req.body
  if (!mobile) return res.status(400).json({ error: 'mobile required' })
  // Persist a user if not exists
  let user = await prisma.user.findUnique({ where: { mobile } })
  if (!user) {
    user = await prisma.user.create({ data: { mobile } })
    await prisma.wallet.create({ data: { userId: user.id } })
  }
  // Generate 6-digit code and store temporarily - for demo we return it.
  const otp = (Math.floor(100000 + Math.random() * 900000)).toString()
  // In prod, send via Twilio Verify service.
  res.json({ ok: true, message: 'OTP sent (demo)', otp })
})

router.post('/verify-otp', async (req, res) => {
  const { mobile, otp } = req.body
  if (!mobile || !otp) return res.status(400).json({ error: 'mobile and otp required' })
  // In production check OTP validity; here we accept any OTP for demo
  const user = await prisma.user.findUnique({ where: { mobile } })
  if (!user) return res.status(404).json({ error: 'User not found' })
  // include role in token for RBAC
  const token = signToken({ userId: user.id, mobile: user.mobile, role: user.role })
  res.json({ token })
})

export default router