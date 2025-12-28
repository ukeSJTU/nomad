#!/bin/bash
set -e

echo "Initializing Nomad development environment..."

# Display environment information
echo "Node.js version: $(node --version)"
echo "pnpm version: $(pnpm --version)"

# ============================================================================
# CI Environment Detection
# ============================================================================
# In CI environments (like GitHub Actions), we skip time-consuming operations
# to speed up the container build process. All validation steps should be
# explicitly defined in the CI workflow's runCmd instead.
#
# This approach provides:
# - Faster container startup in CI
# - Better visibility of what's being tested (explicit in workflow YAML)
# - More reliable CI runs (avoiding timeouts during postCreateCommand)
# ============================================================================
if [ "$CI" = "true" ]; then
  echo "CI environment detected - Running lightweight setup..."
  echo "Installing dependencies only..."
  pnpm install --frozen-lockfile

  echo ""
  echo "✓ CI setup complete!"
  echo "Note: Database initialization, seeding, and Playwright installation"
  echo "      will be handled explicitly by the CI workflow's validation steps."
  exit 0
fi

# ============================================================================
# Full Development Environment Setup (Local Development Only)
# ============================================================================
# The following steps are only executed in local development environments
# to provide a complete, ready-to-use setup.
# ============================================================================

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
