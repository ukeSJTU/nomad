# syntax=docker/dockerfile:1.4

ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-slim

# Install necessary system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    ca-certificates \
    curl \
    gnupg \
    openssh-client \
    bash-completion \
    # Playwright browser dependencies
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpango-1.0-0 \
    libcairo2 \
    # PostgreSQL client for CLI debugging
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm via npm (with fallback to Taobao mirror for network issues)
ARG PNPM_VERSION=10.17.1
RUN npm install -g pnpm@${PNPM_VERSION} || \
    npm install -g pnpm@${PNPM_VERSION} --registry=https://registry.npmmirror.com

# Configure pnpm
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN pnpm config set store-dir /pnpm/store

# Set working directory
WORKDIR /workspace

# Configure Git safe directory to avoid permission warnings
RUN git config --global --add safe.directory /workspace

# Set up shell configuration for node user
USER node
RUN echo 'alias ll="ls -alh"' >> ~/.bashrc && \
    echo 'alias pn="pnpm"' >> ~/.bashrc && \
    echo 'export PS1="\[\e[32m\]\u@nomad-dev\[\e[m\]:\[\e[34m\]\w\[\e[m\]\$ "' >> ~/.bashrc

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node --version && pnpm --version || exit 1
