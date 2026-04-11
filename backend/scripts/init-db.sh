#!/bin/bash
set -euo pipefail

# Database initialisation script
# Executed by Docker's entrypoint as a shell script so that psql
# meta-commands (\if, \set, \gexec, \connect) are available.
#
# Manual usage:
#   psql -U postgres -f scripts/init-db.sql
#
# Override defaults via environment variables:
#   DB_NAME, DB_APP_USER, DB_APP_PASSWORD

psql -v ON_ERROR_STOP=1 \
     -v db_name="${DB_NAME:-kivi}" \
     -v app_user="${DB_APP_USER:-local_user}" \
     -v app_password="'${DB_APP_PASSWORD:-local_user_password}'" \
     --username "$POSTGRES_USER" \
     --dbname "$POSTGRES_DB" \
     -f /scripts/init-db.sql
