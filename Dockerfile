FROM node:20-alpine AS runner

ENV NODE_ENV=production
ENV PORT=8000

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

WORKDIR /app

# Copy built Next.js app and dependencies from workflow artifacts
COPY .next ./.next
COPY public ./public
COPY package.json ./package.json
COPY node_modules ./node_modules

USER nextjs

EXPOSE 8000

CMD ["node_modules/.bin/next", "start", "-p", "8000"]
