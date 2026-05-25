# Use node as the base image
FROM node:24.16.0-trixie

# Install zola
COPY --from=ghcr.io/getzola/zola:v0.22.1 /bin/zola /usr/local/bin/zola

# Set environment variables
ENV DEBIAN_FRONTEND="noninteractive"

RUN set -e && \
  # Update and install system dependencies
  apt-get update -qq && \
  apt-get install -yqq --no-install-recommends \
  git wget curl zip unzip p7zip-full tree ripgrep && \
  # Clean up
  rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Command just to keep the container running
CMD ["sleep", "infinity"]
