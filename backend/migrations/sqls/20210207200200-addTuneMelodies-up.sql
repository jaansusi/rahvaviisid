CREATE TABLE folk_tune.tune_melodies
(
    id bigserial,
    melody text NOT NULL,
    clef text,
    alter text,
    tempo text,
    note_length text,
    title text,
    author text,
    reference text,
    custom_input text,
    words text,
    tune_encodings_id integer NOT NULL,
    remarks text,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

CREATE INDEX IX_tune_melody_encodings_id ON folk_tune.tune_melodies (tune_encodings_id);

ALTER TABLE folk_tune.tunes
    ADD COLUMN tune_melody_id integer;

ALTER TABLE folk_tune.tunes
    ADD COLUMN rhythm_type_id integer;
ALTER TABLE folk_tune.tunes
    ADD CONSTRAINT fk_tunes_tune_melodies FOREIGN KEY (tune_melody_id)
    REFERENCES folk_tune.tune_melodies (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE folk_tune.tunes
    ADD CONSTRAINT fk_tunes_rhythm_types FOREIGN KEY (rhythm_type_id)
    REFERENCES folk_tune.rhythm_types (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE folk_tune.rhythm_types
    ADD COLUMN rhythm text[];

ALTER TABLE folk_tune.rhythm_types
    ADD COLUMN is_public boolean;

ALTER TABLE folk_tune.rhythm_types
    ADD COLUMN public_identifier text;


-- ALTER TABLE folk_tune.tune_melodies
--     ADD CONSTRAINT fk_tune_melodies_tune_encodings FOREIGN KEY (tune_encodings_id)
--     REFERENCES folk_tune.tune_encodings (id) MATCH SIMPLE
--     ON UPDATE NO ACTION
--     ON DELETE NO ACTION
--     NOT VALID;