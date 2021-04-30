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
