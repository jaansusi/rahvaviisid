CREATE SEQUENCE folk_tune.audit_log_id_seq
    INCREMENT 1
    START 1;

CREATE TABLE folk_tune.audit_log
(
    id integer NOT NULL DEFAULT nextval('folk_tune.audit_log_id_seq'::regclass),
    action text,
    acted_at date,
    acted_on text,
    action_key text,
    entity_id integer,
    actor integer,
    before json,
    after json,
    PRIMARY KEY (id)
);
