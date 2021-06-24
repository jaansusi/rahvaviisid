CREATE TABLE folk_tune.audit_log
(
    id bigserial NOT NULL,
    action text NOT NULL,
    acted_at date NOT NULL,
    acted_on text NOT NULL,
    action_key text NOT NULL,
    entity_id integer NOT NULL,
    actor_id uuid NOT NULL,
    before jsonb,
    after jsonb,
    PRIMARY KEY (id)
);

CREATE INDEX IX_audit_log_action_key ON folk_tune.audit_log (action_key);
CREATE INDEX IX_audit_log_entity_id ON folk_tune.audit_log (entity_id);