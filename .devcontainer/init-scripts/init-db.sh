#!/bin/bash
set -e

# Create test database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE nomad_test;
    GRANT ALL PRIVILEGES ON DATABASE nomad_test TO $POSTGRES_USER;
EOSQL

echo "Test database 'nomad_test' created successfully"
