-- Loo kasutaja
DO
$createUser$
BEGIN
IF NOT EXISTS (
    SELECT FROM pg_catalog.pg_roles
    WHERE  rolname = 'local_dev_username')
THEN
    CREATE USER local_dev_username PASSWORD 'local_dev_password';
END IF;
END
$createUser$;
-- Eraldi schema loomine arenduse jaoks
CREATE SCHEMA folk_tune;
COMMENT ON SCHEMA folk_tune IS 'Folk tunes database';
ALTER USER local_dev_username SET search_path = folk_tune, public;

-- Privileges
--REVOKE ALL PRIVILEGES ON SCHEMA folk_tune FROM PUBLIC;
GRANT CONNECT ON DATABASE kivi TO local_dev_username;
GRANT USAGE ON SCHEMA public TO local_dev_username;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA folk_tune TO local_dev_username;
--GRANT postgres TO local_dev_username;

-- systeemi seadistus
SET client_encoding = 'UTF8';
SET check_function_bodies = false;
SET standard_conforming_strings = on;
SET client_min_messages = warning;
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET row_security = off;
SET timezone to 'EET';

-- SELECT pg_catalog.set_config('search_path', '', false);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";