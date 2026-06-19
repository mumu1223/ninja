FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

FROM base AS deps
WORKDIR /app

COPY package.json pnpm-workspace.yaml turbo.json tsconfig.json ./
COPY apps/home/package.json apps/home/package.json
COPY apps/dict/package.json apps/dict/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/ui/package.json packages/ui/package.json

RUN pnpm install --no-frozen-lockfile

FROM deps AS builder
WORKDIR /app

ARG APP_NAME

COPY . .

RUN pnpm --filter ${APP_NAME} build

FROM node:22-alpine AS runner
WORKDIR /app

ARG APP_DIR
ARG APP_PORT

ENV NODE_ENV=production
ENV PORT=${APP_PORT}
ENV HOSTNAME=0.0.0.0
ENV APP_DIR=${APP_DIR}

RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

COPY --from=builder /app/${APP_DIR}/.next/standalone ./
COPY --from=builder /app/${APP_DIR}/.next/static ./${APP_DIR}/.next/static
COPY --from=builder /app/${APP_DIR}/public ./${APP_DIR}/public

USER nextjs

EXPOSE ${APP_PORT}

CMD ["sh", "-lc", "node ${APP_DIR}/server.js"]
