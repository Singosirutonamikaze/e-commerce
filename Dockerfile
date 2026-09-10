# =============================================================================
# Multi-stage Dockerfile for Velure (Next.js + Prisma + pnpm)
# =============================================================================

# --- Stage 1: Base Image ---
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat openssl && \
    corepack enable && \
    corepack prepare pnpm@latest --activate
WORKDIR /app

# --- Stage 2: Dependencies ---
FROM base AS deps
WORKDIR /app

# Copy dependency definition files
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Install dependencies and generate Prisma client
RUN pnpm install --frozen-lockfile && \
    npx prisma generate

# --- Stage 3: Builder ---
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY . .

# Environment variables for build stage
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application
RUN pnpm build

# --- Stage 4: Production Runner ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create a dedicated non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public assets & build outputs
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["pnpm", "start"]
