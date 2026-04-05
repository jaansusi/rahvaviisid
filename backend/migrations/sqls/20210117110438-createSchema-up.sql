-- Eraldi schema loomine arenduse jaoks
-- Skip if folk_tune schema already exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'folk_tune') THEN
    CREATE SCHEMA folk_tune;
    COMMENT ON SCHEMA folk_tune IS 'Folk tunes database';

    -- Privileges
    REVOKE ALL PRIVILEGES ON SCHEMA folk_tune FROM PUBLIC;

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

  END IF;
END
$$;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA folk_tune;
