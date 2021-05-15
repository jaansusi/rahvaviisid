CREATE TABLE folk_tune.audit_log
(
    id bigserial NOT NULL,
    action text,
    acted_at date,
    acted_on text,
    action_key text,
    entity_id integer,
    actor integer,
    before jsonb,
    after jsonb,
    PRIMARY KEY (id)
);

CREATE INDEX IX_audit_log_action_key ON folk_tune.audit_log (action_key);
CREATE INDEX IX_audit_log_entity_id ON folk_tune.audit_log (entity_id);