-- Database initialisation script
-- Requires psql variables: db_name, app_user, app_password
--
-- Via Docker: executed by init-db.sh which sets the variables.
-- Manual:
--   psql -U postgres \
--     -v db_name=kivi \
--     -v app_user=local_user \
--     -v app_password="local_user_password" \
--     -f scripts/init-db.sql

---------------------------------------------------------------------
-- 1. Create the database (skips if it already exists)
---------------------------------------------------------------------
SELECT format('CREATE DATABASE %I ENCODING ''UTF8''', :'db_name')
  WHERE NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = :'db_name')
\gexec

---------------------------------------------------------------------
-- 2. Connect to the database
---------------------------------------------------------------------
\connect :db_name

---------------------------------------------------------------------
-- 3. Create the application schema
---------------------------------------------------------------------
CREATE SCHEMA IF NOT EXISTS folk_tune;
COMMENT ON SCHEMA folk_tune IS 'Folk tunes database';
REVOKE ALL PRIVILEGES ON SCHEMA folk_tune FROM PUBLIC;

---------------------------------------------------------------------
-- 4. Install required extensions inside the schema
---------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA folk_tune;

---------------------------------------------------------------------
-- 5. Create the application user (skips if it already exists)
---------------------------------------------------------------------
SELECT format('CREATE USER %I WITH PASSWORD %L', :'app_user', :app_password)
  WHERE NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = :'app_user')
\gexec

---------------------------------------------------------------------
-- 6. Grant privileges
---------------------------------------------------------------------
-- Database-level
GRANT CONNECT ON DATABASE :db_name TO :app_user;

-- Schema-level
GRANT USAGE  ON SCHEMA folk_tune TO :app_user;
GRANT CREATE ON SCHEMA folk_tune TO :app_user;
GRANT USAGE  ON SCHEMA public    TO :app_user;
GRANT CREATE ON SCHEMA public    TO :app_user;

-- All current objects (empty on first run, useful for re-runs)
GRANT ALL PRIVILEGES ON ALL TABLES    IN SCHEMA folk_tune TO :app_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA folk_tune TO :app_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA folk_tune TO :app_user;
GRANT ALL PRIVILEGES ON ALL TABLES    IN SCHEMA public    TO :app_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public    TO :app_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public    TO :app_user;

-- Future objects created in the schema
ALTER DEFAULT PRIVILEGES IN SCHEMA folk_tune
  GRANT ALL PRIVILEGES ON TABLES    TO :app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA folk_tune
  GRANT ALL PRIVILEGES ON SEQUENCES TO :app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA folk_tune
  GRANT ALL PRIVILEGES ON FUNCTIONS TO :app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL PRIVILEGES ON TABLES    TO :app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL PRIVILEGES ON SEQUENCES TO :app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL PRIVILEGES ON FUNCTIONS TO :app_user;

---------------------------------------------------------------------
-- 7. Configure schema defaults
---------------------------------------------------------------------
SET client_encoding = 'UTF8';
SET timezone TO 'EET';
