FROM node:20-alpine AS builder
WORKDIR /app

COPY client/package*.json ./client/
COPY server/package*.json ./server/

RUN npm --prefix client install
RUN npm --prefix server install

COPY client ./client
COPY server ./server

RUN npm --prefix client run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/server ./server
COPY --from=builder /app/client/dist ./client/dist

EXPOSE 5000
CMD ["node", "server/server.js"]
