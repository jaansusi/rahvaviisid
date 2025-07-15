-- Eraldi schema loomine arenduse jaoks
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

-- SELECT pg_catalog.set_config('search_path', '', false);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";