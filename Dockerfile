# Use multi-stage builds to optimize image size

# Build AI service
FROM python:3.9-slim as ai-builder
WORKDIR /app/ai
COPY ai/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY ai/ .

# Build Web service
FROM node:16-alpine as web-builder
WORKDIR /app/web
COPY web/package*.json ./
RUN npm ci
COPY web/ .
RUN npm run build

# Build Blockchain service
FROM rust:1.70 as blockchain-builder
WORKDIR /app/blockchain
COPY blockchain/ .
RUN cargo build --release

# Final runtime image
FROM python:3.9-slim
WORKDIR /app

# Copy build artifacts
COPY --from=ai-builder /app/ai /app/ai
COPY --from=web-builder /app/web/dist /app/web/dist
COPY --from=blockchain-builder /app/blockchain/target/release /app/blockchain

# Install Node.js runtime
RUN apt-get update && apt-get install -y nodejs npm

# Set environment variables
ENV PYTHONPATH=/app
ENV NODE_ENV=production

# Expose ports
EXPOSE 3000 5000

# Start services
CMD ["sh", "-c", "cd /app/ai && python app.py & cd /app/web && npm run serve"]