# Step 1: Build the app
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy app source and build
COPY . .
RUN npm run build

# Step 2: Run the app in a lightweight image
FROM node:20-alpine AS runner

ENV NODE_ENV=production
ENV PORT=8000

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

USER nextjs

# Expose custom port
EXPOSE 8000

# Start Next.js app on port 8000
CMD ["node_modules/.bin/next", "start", "-p", "8000"]
