CREATE TABLE folk_tune.externalreferences
(
    id smallserial NOT NULL,
    tune_id integer NOT NULL,
    type_id integer NOT NULL,
    description folk_tune.D_description,
    value folk_tune.D_text_long,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_externalreference PRIMARY KEY (id),
    CONSTRAINT FK_externalreferences_tunes FOREIGN KEY (tune_id) REFERENCES folk_tune.tunes (id)
)
;
INSERT INTO folk_tune.externalreferences (tune_id,type_id,description, value)
VALUES
    (1,1,'Käsikiri','ERA-15039-52820-34479');