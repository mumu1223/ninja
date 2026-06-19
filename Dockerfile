# Runner stage — deps and build are pre-built on host filesystem
# via volume-mounted container (bypasses Docker VFS driver bug on CentOS 7)
FROM node:22-alpine AS runner
WORKDIR /app

ARG APP_DIR
ARG APP_PORT

ENV NODE_ENV=production
ENV PORT=${APP_PORT}
ENV HOSTNAME=0.0.0.0
ENV APP_DIR=${APP_DIR}

RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

COPY ${APP_DIR}/.next/standalone ./
COPY ${APP_DIR}/.next/static ./${APP_DIR}/.next/static
COPY ${APP_DIR}/public ./${APP_DIR}/public

USER nextjs

EXPOSE ${APP_PORT}

CMD ["sh", "-lc", "node ${APP_DIR}/server.js"]
