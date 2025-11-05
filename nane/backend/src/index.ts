import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth'
import usersRoutes from './routes/users'
import tasksRoutes from './routes/tasks'
import walletRoutes from './routes/wallet'
import adminRoutes from './routes/admin'

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

app.use(cors({ origin: true }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/tasks', tasksRoutes)
app.use('/api/wallet', walletRoutes)
app.use('/api/admin', adminRoutes)

app.get('/', (req, res) => res.json({ ok: true, message: 'SMCNepal API' }))

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})