# Build stage: Compile TypeScript to JavaScript
FROM denoland/deno:2.1.4 AS builder

WORKDIR /app

# Copy source files
COPY deno.json ./
COPY src/ ./src/

# Cache dependencies
RUN deno cache src/main.ts

# Compile to standalone executable
RUN deno compile \
    --allow-net \
    --allow-env \
    --allow-read \
    --output server \
    src/main.ts

# Runtime stage: Minimal image with compiled binary
FROM debian:bookworm-slim AS runtime

WORKDIR /app

# Install SSL certificates for HTTPS requests and curl for health checks
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates curl && \
    rm -rf /var/lib/apt/lists/*

# Copy compiled binary from builder
COPY --from=builder /app/server /app/server

# Create non-root user for security
RUN useradd -r -s /bin/false appuser && \
    chown -R appuser:appuser /app

USER appuser

# Expose the port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3001/health || exit 1

# Run the compiled server
CMD ["/app/server"]
