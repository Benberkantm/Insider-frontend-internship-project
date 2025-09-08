FROM node:20-alpine
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Runtime env
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

# Start Nitro server
CMD ["node", ".output/server/index.mjs"]


