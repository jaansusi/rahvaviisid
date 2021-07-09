-- Use this to get the tables with "modified columns"

-- select t.table_schema,
--        t.table_name
-- from information_schema.tables t
-- inner join information_schema.columns c on c.table_name = t.table_name 
--                                 and c.table_schema = t.table_schema
-- where c.column_name = 'modified'
--       and t.table_schema not in ('information_schema', 'pg_catalog')
--       and t.table_type = 'BASE TABLE'
-- order by t.table_schema;

CREATE OR REPLACE FUNCTION f_set_modified_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.modified = localtimestamp(0);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO
$$
DECLARE
    rec record;
BEGIN
    FOR rec IN 
        SELECT table_schema, table_name, column_name
        FROM information_schema.columns 
        WHERE column_name = 'modified'
    LOOP
        EXECUTE format('CREATE TRIGGER tr_set_timestamp BEFORE UPDATE ON folk_tune.%I FOR EACH ROW EXECUTE PROCEDURE f_set_modified_timestamp();',
            rec.table_name);
    END LOOP;
END;
$$
LANGUAGE plpgsql;