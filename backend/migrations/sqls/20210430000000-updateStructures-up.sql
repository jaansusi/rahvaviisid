CREATE TABLE folk_tune.external_references
(
    id serial NOT NULL,
    tune_id integer NOT NULL,
    type_id integer NOT NULL,
    description text,
    value text NOT NULL,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_externalreference PRIMARY KEY (id),
    CONSTRAINT FK_externalreferences_tunes FOREIGN KEY (tune_id) REFERENCES folk_tune.tunes (id)
);

CREATE INDEX IX_external_references_tune_id ON folk_tune.external_references (tune_id);

INSERT INTO folk_tune.external_references (tune_id,type_id,description, value)
VALUES
    (1,1,'Käsikiri','ERA-15039-52820-34479');