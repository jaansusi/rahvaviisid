CREATE TABLE folk_tune."user"
(
    id uuid NOT NULL,
    realm text,
    username text,
    email text UNIQUE NOT NULL,
    "emailverified" boolean,
    "verificationtoken" text,
    firstname text,
    lastname text,
    roles text[],
    PRIMARY KEY (id)
);

CREATE TABLE folk_tune."user_credentials"
(
    id uuid NOT NULL,
    password text NOT NULL,
    "userid" uuid UNIQUE,
    PRIMARY KEY (id),
    CONSTRAINT fk_user_credentials_user FOREIGN KEY ("userid")
        REFERENCES folk_tune."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TABLE folk_tune."refresh_token"
(
    id uuid NOT NULL,
    "userid" uuid NOT NULL,
    "refreshToken" text,
    PRIMARY KEY (id),
    CONSTRAINT fk_refresh_token_user FOREIGN KEY ("userid")
        REFERENCES folk_tune."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

INSERT INTO folk_tune.user(id, email, roles, firstname, lastname)
    VALUES (uuid_generate_v4(), 'admin@ekm.ee', ARRAY['admin'], 'Admin', 'Istrator');

INSERT INTO folk_tune.user_credentials(id, password, userid)
    (SELECT uuid_generate_v4(), '$2a$10$NkXNEbcUVbW6jopSkoVvIeTgbX8acFD/BRMBUAFS3FP4lxNNaXnxS', id as userid FROM folk_tune.user WHERE email = 'admin@ekm.ee');