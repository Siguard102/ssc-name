# SMCNepal

A lightweight, responsive web application for task-based earnings with a user dashboard and admin panel.

Tech stack
- Frontend: Next.js + React + Tailwind CSS + TypeScript
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL (Prisma ORM)
- Auth/security: JWT + bcrypt + (Twilio OTP integration placeholder)
- Payment: Manual/Stripe placeholder
- Designed mobile-first, responsive, dark/light mode

This repository contains two folders:
- `frontend/` — Next.js app (UI)
- `backend/` — Express API (REST)

Features implemented
- Mobile-number based signup/login flow (OTP verification placeholder)
- JWT authentication
- User dashboard: Work, Tasks, Deposit, Withdraw, Profile, Contact
- Wallet endpoints: deposit and withdrawal request management
- Admin panel at `/admin` (frontend) + `/api/admin` (backend) with user/fund management
- Prisma schema for PostgreSQL and seed script
- Tailwind CSS responsive UI (mobile-first) and dark mode

Quickstart (development)
1. Install dependencies (root)
   - Ensure you have Node 18+, npm/yarn, and PostgreSQL running.

2. Backend
   - cd backend
   - cp .env.example .env and fill values (DATABASE_URL, JWT_SECRET, TWILIO_* etc.)
   - npm install
   - npx prisma generate
   - npx prisma migrate dev --name init
   - npm run seed (optional)
   - npm run dev
     - Backend runs at: http://localhost:4000

3. Frontend
   - cd frontend
   - cp .env.local.example .env.local and set REACT_APP_API_URL=http://localhost:4000
   - npm install
   - npm run dev
     - Frontend runs at: http://localhost:3000

Environment variables
- backend/.env (see .env.example)
  - DATABASE_URL=postgresql://user:pass@localhost:5432/smcnepal
  - JWT_SECRET=change_this
  - TWILIO_ACCOUNT_SID=...
  - TWILIO_AUTH_TOKEN=...
  - TWILIO_SERVICE_SID=...
- frontend/.env.local.example
  - NEXT_PUBLIC_API_BASE=http://localhost:4000

Notes and next steps
- Twilio OTP sending is scaffolded; you must enable Twilio credentials and uncomment sending logic.
- Stripe integration for deposits is left as an integration point (manual deposits currently supported).
- Production: use secure HTTPS, rotate JWT_SECRET, configure CORS and domain whitelist, run migrations, and set proper email/SMS providers.

Project structure (high level)
- frontend/
  - pages/, components/, styles/
- backend/
  - src/
    - routes/*.ts
    - middleware/auth.ts
    - utils/jwt.ts
  - prisma/
    - schema.prisma
    - seed.ts

If you want, I can:
- Add full Twilio OTP flow and demo phone numbers
- Add Stripe deposit integration with webhooks
- Add Docker Compose for PostgreSQL + app services
- Create unit tests for backend endpoints
