#!/bin/bash
set -e

echo "Initializing Nomad development environment..."

# Display environment information
echo "Node.js version: $(node --version)"
echo "pnpm version: $(pnpm --version)"

# Install dependencies
echo "Installing dependencies..."
pnpm install --frozen-lockfile

# Wait for database to be ready
echo "Waiting for PostgreSQL to be ready..."
until pg_isready -h postgres -U nomad -d nomad_dev > /dev/null 2>&1; do
  echo "Waiting for database..."
  sleep 2
done
echo "Database is ready!"

# Initialize development database
echo "Initializing development database..."
cd /workspace/apps/web
pnpm db:push

# Seed development database (optional)
echo "Seeding development database..."
pnpm db:seed || echo "Warning: Seeding failed or skipped"

# Initialize test database
echo "Initializing test database..."
export NODE_ENV=test
export DATABASE_URL=postgresql://nomad:nomad_dev_password@postgres:5432/nomad_test
pnpm db:push || echo "Warning: Test DB initialization failed"

# Install Playwright browsers
echo "Installing Playwright browsers..."
cd /workspace/apps/web
pnpm exec playwright install chromium --with-deps || echo "Warning: Playwright installation failed"

# Create local environment variable file if it doesn't exist
cd /workspace/apps/web
if [ ! -f .env.local ]; then
  echo "Creating .env.local for development..."
  cat > .env.local << 'EOF'
# Local development overrides
# This file is automatically created by devcontainer

# Database (managed by Docker Compose)
DATABASE_URL=postgresql://nomad:nomad_dev_password@postgres:5432/nomad_dev

# Auth (development defaults)
BETTER_AUTH_SECRET=dev_secret_key_change_in_production_32_chars_minimum
BETTER_AUTH_URL=http://localhost:3000

# Features (disabled by default in dev)
ENABLE_ALIYUN_SMS=disabled
ENABLE_RESEND=disabled

# Logging
LOG_LEVEL=debug
EOF
fi

# Return to workspace root
cd /workspace

echo ""
echo "Setup complete! You can now:"
echo "   - Run 'pnpm dev' to start all applications"
echo "   - Run 'pnpm web:dev' to start only the web app"
echo "   - Run 'pnpm web:test' to run tests"
echo "   - Open http://localhost:3000 to view the app"
echo ""
