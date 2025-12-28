#!/bin/bash
set -e

echo "Container started, running post-start checks..."

# Check database connection
echo "Checking database connection..."
if pg_isready -h postgres -U nomad -d nomad_dev > /dev/null 2>&1; then
  echo "Database connection OK"
else
  echo "Warning: Database not ready, some features may not work"
fi

# Display quick start guide
echo ""
echo "Quick Start Commands:"
echo "   pnpm dev          - Start all apps"
echo "   pnpm web:dev      - Start web app only"
echo "   pnpm web:db:studio - Open Drizzle Studio"
echo "   pnpm web:test     - Run tests"
echo ""
