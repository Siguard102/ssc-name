# Use Debian-slim base to avoid OpenSSL / musl issues when running Prisma
FROM node:18-bullseye-slim
WORKDIR /app

# Install system deps required by Prisma and native modules
RUN apt-get update && apt-get install -y ca-certificates openssl libssl-dev --no-install-recommends && rm -rf /var/lib/apt/lists/*

# copy package.json first to leverage cache
COPY backend/package*.json ./
RUN npm install

# copy rest of backend files
COPY backend/ ./

# generate prisma client (requires node_modules installed)
RUN npx prisma generate --schema=./prisma/schema.prisma || true

EXPOSE 4000
CMD ["npm", "run", "dev"]
