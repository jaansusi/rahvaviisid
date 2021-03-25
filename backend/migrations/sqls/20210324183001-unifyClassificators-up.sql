CREATE TABLE folk_tune.classificator_group
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    title text,
    PRIMARY KEY (id)
);

CREATE TABLE folk_tune.classificator_type
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    title text NOT NULL,
    classificator_group_id integer NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE folk_tune.classificator_type
    ADD CONSTRAINT fk_classificator_type_classificator_group_id FOREIGN KEY (classificator_group_id)
    REFERENCES folk_tune.classificator_group (id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

CREATE TABLE folk_tune.classificator
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    title text NOT NULL,
    description text,
    is_active boolean NOT NULL,
    created_at timestamp without time zone NOT NULL,
    modified_at timestamp without time zone NOT NULL,
    classificator_type_id integer NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE folk_tune.classificator
    ADD CONSTRAINT fk_classificator_classificator_type_id FOREIGN KEY (classificator_type_id)
    REFERENCES folk_tune.classificator_type (id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

INSERT INTO folk_tune.classificator_group(title) VALUES
    ('tune'),
    ('person'),
    ('performance'),
    ('song'),
    ('song2'),
    ('transcription'),
    ('coding');


INSERT INTO folk_tune.classificator_type(title, classificator_group_id)	VALUES 
    ('nation', 1),
    ('language', 1),
    ('tuneState', 1),
    ('tuneGenre', 1),
    ('personRole', 2),
    ('userRole', 2),
    ('personSex', 2),
    ('performanceActualType', 3),
    ('performanceTraditionalType', 3),
    ('performanceActualAction', 3),
    ('performanceTraditionalAction', 3),
    ('songGenre', 4),
    ('songTopic', 4),
    ('songVerse', 4),
    ('textForm', 5),
    ('tuneForm', 5),
    ('soundRange', 5),
    ('rhythmType', 5),
    ('transcriptionSource', 6),
    ('transcriptionPersonRole', 6),
    ('keySignature', 7),
    ('supportSound', 7),
    ('pitch', 7),
    ('measure', 7);

