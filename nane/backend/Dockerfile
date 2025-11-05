# Lightweight Dockerfile for local dev (runs "npm run dev")
FROM node:18-alpine
WORKDIR /app

# copy package.json first to leverage cache
COPY backend/package*.json ./
RUN npm install

# copy rest of backend files
COPY backend/ ./

# generate prisma client (requires node_modules installed)
RUN npx prisma generate --schema=./prisma/schema.prisma || true

EXPOSE 4000
CMD ["npm", "run", "dev"]