# -------- BASE --------
FROM node:22-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# -------- DEPS --------
FROM base AS deps
COPY package.json package-lock.json ./
COPY scripts/ ./scripts/
RUN npm ci

# -------- BUILDER --------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time placeholders required by Prisma and Next.js during `next build`.
ARG DATABASE_URL="postgresql://user:pass@localhost:5432/db?sslmode=disable"
ARG DIRECT_URL="postgresql://user:pass@localhost:5432/db?sslmode=disable"
ARG NEXTAUTH_URL="http://localhost:3000"
ARG NEXTAUTH_SECRET="build-only-secret-do-not-use-in-production-123456"
ARG ADMIN_EMAIL="admin@example.com"
ARG CARD_PRICE_XOF="5000"

ENV DATABASE_URL=$DATABASE_URL
ENV DIRECT_URL=$DIRECT_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV ADMIN_EMAIL=$ADMIN_EMAIL
ENV CARD_PRICE_XOF=$CARD_PRICE_XOF

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

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/middleware.ts ./middleware.ts
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/messages ./messages
COPY --from=builder /app/src ./src

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
