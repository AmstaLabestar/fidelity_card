# SmartCard - RFID Discount Network

The first MVP for a startup selling RFID + QR Code discount cards. This platform allows consumers to understand the concept, see benefits, and pre-order their cards.

## Architecture Overview

This project follows **Clean Architecture** and **SOLID principles**, structured as a modular monolith.

### Folder Structure

- `src/app`: Next.js App Router (Routes, Layouts, Server Actions).
- `src/modules`: Domain-specific logic (Auth, Users, Preorders).
- `src/repositories`: Data Access Layer (Repository Pattern).
- `src/services`: Business Logic Layer (Service Pattern).
- `src/controllers`: Orchestration (Server Actions).
- `src/components`: Reusable UI components (DaisyUI + Tailwind).
- `src/lib`: Shared libraries (Prisma, NextAuth).
- `src/config`: App configuration.
- `prisma`: Database schema and migrations.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + DaisyUI
- **Database**: PostgreSQL (via Prisma)
- **Auth**: NextAuth.js
- **Animations**: Motion (formerly Framer Motion)
- **Icons**: Lucide React

## Database Schema

### User
- `id`: String (CUID)
- `name`: String
- `email`: String (Unique)
- `password`: String (Hashed)
- `phone`: String
- `createdAt`: DateTime

### Preorder
- `id`: String (CUID)
- `userId`: String (FK)
- `quantity`: Int
- `status`: String (pending, confirmed, delivered)
- `createdAt`: DateTime

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `NEXTAUTH_SECRET`: A random string for session encryption.

3. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Development Workflow

We use **Agile Sprint Development**. Each feature is implemented in isolated sprints to ensure quality and iterative feedback.

- **Sprint 1**: Foundation & Landing Page (Completed)
- **Sprint 2**: Authentication & User Registration (Planned)
- **Sprint 3**: Pre-order System & Dashboard (Planned)

## Docker + CI/CD (VPS)

### Local (Docker)

Build & run:
```bash
docker build -t fidelity_card .
docker run --rm -p 3000:3000 --env-file .env fidelity_card
```

### VPS (Docker Compose)

1) Install Docker + Docker Compose plugin on the VPS.
2) On the VPS, create an app directory (example: `/opt/fidelity_card`) containing:
   - `docker-compose.yml` (from this repo)
   - `.env.production` (NOT committed)
3) Start:
```bash
docker compose pull
docker compose run --rm web npx prisma migrate deploy
docker compose up -d
```

### GitHub Actions (CI/CD)

Workflow: `.github/workflows/cicd.yml`

Required GitHub Secrets:
- `VPS_HOST`: VPS hostname/IP
- `VPS_USER`: SSH user (e.g. `deploy`)
- `VPS_SSH_KEY`: private SSH key for the VPS user
- `VPS_APP_DIR`: app directory on VPS (e.g. `/opt/fidelity_card`)
- `GHCR_USER`: GitHub username/org for pulling images
- `GHCR_TOKEN`: token with `read:packages` (or make the GHCR image public)
