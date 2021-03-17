DROP TABLE folk_tune.tune_variations;

ALTER TABLE folk_tune.tune_melodies
    ADD COLUMN variation_index integer;

ALTER TABLE folk_tune.tune_melodies DROP COLUMN clef;

ALTER TABLE folk_tune.tune_melodies
    ADD COLUMN rhythm_type_id integer;

ALTER TABLE folk_tune.tune_melodies
    ADD CONSTRAINT fk_tune_melodies_rhythm_types FOREIGN KEY (rhythm_type_id)
    REFERENCES folk_tune.rhythm_types (id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE folk_tune.tunes
    ADD COLUMN clef text;

ALTER TABLE folk_tune.tunes
    ADD COLUMN support_sound text;

ALTER TABLE folk_tune.tunes
    ADD COLUMN height text;

ALTER TABLE folk_tune.tunes
    ADD COLUMN bar text;

ALTER TABLE folk_tune.tune_melodies
    RENAME rhythm_type_id TO rhythm_type;
ALTER TABLE folk_tune.tune_melodies DROP CONSTRAINT fk_tune_melodies_rhythm_types;

ALTER TABLE folk_tune.tunes
    ADD COLUMN old_tune_id integer;