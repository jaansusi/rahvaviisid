CREATE TABLE folk_tune.tune_melodies
(
    id integer,
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
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE folk_tune.tune_melodies
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;

ALTER TABLE folk_tune.tune_melodies
    OWNER to local_dev_username;

CREATE TABLE folk_tune.tune_variations
(
    id integer,
    tune_id integer NOT NULL,
    start_position integer NOT NULL,
    melody text[],
    rhythm text[],
    PRIMARY KEY (id),
    CONSTRAINT fk_tune_variations_tunes FOREIGN KEY (tune_id)
        REFERENCES folk_tune.tunes (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE folk_tune.tune_variations
    OWNER to local_dev_username;

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

ALTER TABLE folk_tune.tune_melodies
    ADD COLUMN tune_id integer NOT NULL;
ALTER TABLE folk_tune.tune_melodies
    ADD CONSTRAINT fk_tune_melodies_tunes FOREIGN KEY (tune_id)
    REFERENCES folk_tune.tunes (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;