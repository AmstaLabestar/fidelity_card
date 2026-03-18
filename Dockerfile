# -------- BASE --------
FROM node:22-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# -------- DEPS --------
FROM base AS deps
# Copier package.json + lock + scripts
COPY package.json package-lock.json ./ 
COPY scripts/ ./scripts/
RUN npm ci

# -------- BUILDER --------
FROM base AS builder
# Copier les node_modules de deps
COPY --from=deps /app/node_modules ./node_modules
# Copier tout le code
COPY . .
# Variables fake pour Prisma (build sans DB)
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/db?sslmode=disable"
ENV DIRECT_URL="postgresql://user:pass@localhost:5432/db?sslmode=disable"
# Générer Prisma + build Next.js
RUN npx prisma generate
RUN npm run build

# -------- PROD DEPS --------
FROM base AS prod-deps
COPY package.json package-lock.json ./
COPY scripts/ ./scripts/     
RUN npm ci --omit=dev

# -------- RUNNER --------
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000

RUN useradd -m -u 1001 nextjs

# Copier node_modules production
COPY --from=prod-deps /app/node_modules ./node_modules
# Copier build + config + Prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/middleware.ts ./middleware.ts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000
CMD ["npm", "run", "start", "--", "-p", "3000"]