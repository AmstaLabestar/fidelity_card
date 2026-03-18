FROM node:22-bookworm-slim AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1


FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci


FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prisma generate doesn't need a real DB connection, but the schema expects env vars to exist.
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/db?sslmode=disable"
ENV DIRECT_URL="postgresql://user:pass@localhost:5432/db?sslmode=disable"

RUN npx prisma generate
RUN npm run build


FROM base AS prod-deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev


FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000

RUN useradd -m -u 1001 nextjs

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/middleware.ts ./middleware.ts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000
CMD ["npm", "run", "start", "--", "-p", "3000"]

